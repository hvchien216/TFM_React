import {
	FETCHING_DATA,
	CLEAR_ERRORS,
	SET_ERRORS,
	SET_ROUTE_NAVBAR,
	SET_CATEGORY_ID_LIST
} from '../types';
import productApi from '../../api/productApi';
import categoryApi from '../../api/categoryApi';
import categorytApi from '../../api/categoryApi';

export const fetchingData = () => dispatch => {
	dispatch({
		type: FETCHING_DATA
	})
}

export const setError = (error) => dispatch => {
	dispatch({
		type: SET_ERRORS,
		payload: { error_message: error, error_code: null }
	});
}

export const fetchProductDetail = (code, history) => async dispatch => {
	try {
		const res = await productApi.detail(code);
		const { success, error_message, data, error_code } = res;
		dispatch({ type: CLEAR_ERRORS });
		if (!success) {
			dispatch({
				type: SET_ERRORS,
				payload: { error_message, error_code }
			});
			history.push('/not-found');
			return;
		}
		return data;
	} catch (error) {
		console.log("Err==>", error);
	}
}

export const fetchListProduct = (query, history) => async dispatch => {
	try {
		const res = await productApi.list(query);
		const { success, error_message, error_code, data } = res;
		dispatch({ type: CLEAR_ERRORS });
		if (!success) {
			dispatch({
				type: SET_ERRORS,
				payload: { error_message, error_code }
			});
			history.push('/not-found');
			return;
		}
		return data;
	} catch (error) {
		console.log("Err==>", error);
	}
}

export const fetchCategory = (history) => async dispatch => {
	try {
		let categoryParent = [];
		let categoryIdObjList = [];
		const res = await categorytApi.parentList();
		const { success, error_message, data, error_code } = res;
		dispatch({ type: CLEAR_ERRORS });
		if (!success) {
			dispatch({
				type: SET_ERRORS,
				payload: { error_message, error_code }
			});
			return;
		}
		data.map(ele => categoryParent.push({
			id: ele.id,
			label: ele.name,
			to: `/collections/${ele.slug}`,
			nav_nested: [
			]
		}));

		categoryIdObjList = data
			.filter(e => e.is_leaf)
			.map(ele => ({ id: ele.id, name: ele.slug }));
		console.log(categoryIdObjList)
		//convert to Object
		// categoryIdList = { ...categoryIdObjList };

		let categoryChild = Promise.all(data
			.filter(ele => !ele.is_leaf)
			.map(el => categorytApi.childList(el.id))
		);

		categoryChild
			.then(res => {
				//map to nav_nested of categoryParent
				res.map(({ data }) => {
					const parentId = data[0].parent_id;
					let navNested = categoryParent.filter(ele => ele.id === parentId)[0].nav_nested;
					data.map(el => navNested.push({
						id: el.id,
						label: el.name,
						to: `/collections/${el.slug}`,
					}))
				})

				//map to categoryIdObjList
				res.map(({ data }) => data.map(el => categoryIdObjList.push({ id: el.id, name: el.slug })));

				// console.log(categoryIdObjList)
				// categoryIdObjList = [...cate]

			})
			.then(() => {
				dispatch({
					type: SET_ROUTE_NAVBAR,
					payload: categoryParent
				});

				dispatch({
					type: SET_CATEGORY_ID_LIST,
					payload: categoryIdObjList
				});
			})
			.catch(err => console.log(err))

	} catch (error) {
		console.log("Err==>", error);
	}
}