import swal from '@sweetalert/with-react';

export const formatCurrency = (n, currency) => {
	return n.toLocaleString() + currency;
}

export const isNaN = (event) => {
	if (isNaN(this.value + String.fromCharCode(event.keyCode)))
		return false;
}

export const isObjectEmpty = (obj) => {

	return Object.keys(obj).length === 0;
}

export const setAndGetViewedProducts = (data) => {
	let imgLocal = JSON.parse(sessionStorage.getItem('recent_products'));
	let newImgLocal = { images: [] };
	//check is empty
	if (!imgLocal) {
		newImgLocal.images.push(data);
		sessionStorage.setItem('recent_products', JSON.stringify(newImgLocal));
		return newImgLocal;
	}

	const isExisted = imgLocal.images.some(img => img.id === data.id);
	// check is existed
	if (isExisted) {
		newImgLocal.images = imgLocal.images.filter(img => img.id !== data.id);
	} else {
		newImgLocal.images = imgLocal.images;
	}
	if (newImgLocal.images.length === 0) {
		newImgLocal.images.push(data);
	} else {
		newImgLocal.images.unshift(data);
	}
	//check is full item: max 8 item
	if (newImgLocal.images.length > 8) {
		newImgLocal.images.pop();
	}
	sessionStorage.setItem('recent_products', JSON.stringify(newImgLocal))
	return newImgLocal;

}

export const savedYourCard = (data) => {
	localStorage.setItem('your_cart', JSON.stringify(data));
}

export const uppercaseFirstCharater = (text) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

export const alertNotification = (text, icon = "success", btn = "OK") => {
	console.log(btn)
	let settings = {
		title: "Thông báo",
		text: text,
		icon: icon,
		buttons: btn,
		timer: 3000,
	}
	if (Array.isArray(btn)) {
		settings.dangerMode = true;
		settings.timer = false;
	}
	if (typeof text !== "string") {
		delete settings["text"];
		settings.content = text;
	}

	return swal(settings);
}

export const alertError = (text) => {
	swal({
		title: "Thông báo!",
		text: text,
		icon: "error",
		button: "OK",
		timer: 3000,
	});
}

export const requiredWith = function (ref, expectedValue, msg) {
	return this.test({
		name: 'requiredWith',
		exclusive: false,
		message: msg,
		test(value) { return (this.resolve(ref) !== expectedValue) || (this.resolve(ref) === expectedValue && !!value); }, //value là giá trị hiện tại của field gọi method
	});
}
