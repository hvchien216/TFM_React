import categorytApi from '../../api/categoryApi';
import productApi from '../../api/productApi';
import {
	CLEAR_ERRORS,
	FETCHING_DATA,
	SET_ERRORS,
	SET_ROUTE_NAVBAR
} from '../types';

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

export const fetchListProduct = (query, history, isDiscount) => async dispatch => {
	try {
		const res = isDiscount ? await productApi.discountProductList(query) : await productApi.list(query);
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

export const fetchCategory = () => async dispatch => {
	try {
		let categoryParent = [];
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
			})
			.then(() => {
				dispatch({
					type: SET_ROUTE_NAVBAR,
					payload: categoryParent
				});
			})
			.catch(err => console.log(err))

	} catch (error) {
		console.log("Err==>", error);
	}
}