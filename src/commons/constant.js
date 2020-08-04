export const SORT_PAGI = [
	{ value: 1, name: 'Tên A → Z' },
	{ value: 2, name: 'Tên Z → A' },
	{ value: 3, name: 'Giá tăng dần' },
	{ value: 4, name: 'Giá giảm dần' },
]

export const FILTER_BY = [
	{
		id: 1, name: 'price', title: "GIÁ THÀNH", items: [
			{ id: 1, name: 'Tất cả giá', value: { min_amount: null, max_amount: null } },
			{ id: 2, name: 'Giá dưới 1.000.000đ', value: { min_amount: 1000000, max_amount: null } },
			{ id: 3, name: '1.000.000đ - 2.000.000đ', value: { min_amount: 1000000, max_amount: 2000000 } },
			{ id: 4, name: '2.000.000đ - 3.000.000đ', value: { min_amount: 2000000, max_amount: 3000000 } },
			{ id: 5, name: '3.000.000đ - 5.000.000đ', value: { min_amount: 3000000, max_amount: 5000000 } },
		],
	},
	{
		id: 2, name: 'brand', title: "HÃNG", items: [
			{ id: 1, name: 'All', value: { supplier: null } },
			{ id: 2, name: 'Adidas', value: { supplier: 'adidas' } },
			{ id: 3, name: 'Asics', value: { supplier: 'asics' } },
			{ id: 4, name: 'Champion', value: { supplier: 'champion' } },
			{ id: 5, name: 'Converse', value: { supplier: 'converse' } },
			{ id: 6, name: 'Domba', value: { supplier: 'domba' } },
			{ id: 7, name: 'Fila', value: { supplier: 'fila' } },
			{ id: 8, name: 'MLB', value: { supplier: 'mlb' } },
			{ id: 9, name: 'New Balance', value: { supplier: 'newbalance' } },
			{ id: 10, name: 'Nike', value: { supplier: 'nike' } },
			{ id: 11, name: 'Puma', value: { supplier: 'puma' } },
			{ id: 12, name: 'Reebok', value: { supplier: 'reebok' } },
			{ id: 13, name: 'Vans', value: { supplier: 'vans' } },
		]
	},
	{
		id: 3, name: 'size', title: "SIZE", items: [
			{ id: 1, name: 'All size', value: { size: null } },
			{ id: 2, name: '35', value: { size: 35 } },
			{ id: 3, name: '35.5', value: { size: 35.5 } },
			{ id: 4, name: '36', value: { size: 36 } },
			{ id: 5, name: '36.5', value: { size: 36.5 } },
			{ id: 6, name: '37', value: { size: 37 } },
			{ id: 7, name: '38', value: { size: 38 } },
			{ id: 8, name: '38.5', value: { size: 38.5 } },
			{ id: 9, name: '39', value: { size: 39 } },
			{ id: 10, name: '40', value: { size: 40 } },
			{ id: 11, name: '40.5', value: { size: 40.5 } },
			{ id: 12, name: '41', value: { size: 41 } },
			{ id: 13, name: '42', value: { size: 42 } },
			{ id: 14, name: '42.5', value: { size: 42.5 } },
			{ id: 15, name: '43', value: { size: 43 } },
			{ id: 16, name: '44', value: { size: 44 } },
			{ id: 17, name: '44.5', value: { size: 44.5 } },
			{ id: 18, name: '45', value: { size: 45 } },
		]
	}
]

export const CHECKOUT_MAIN_FIELDS = [
	{ label: 'Email', type: 'input', name: 'email', value: '' },
	{ label: 'Họ và tên', type: 'input', name: 'name', value: '' },
	{ label: 'Số điện thoại', type: 'input', name: 'phone', value: '' },
	{ label: 'Địa chỉ', type: 'input', name: 'address', value: '' },
	{ label: 'Giao hàng đến địa chỉ khác', type: 'checkbox', name: 'anotherAddress', value: false },
	{ label: 'Họ và tên người nhận', type: 'input', name: 'nameReceive', value: '' },
	{ label: 'Địa chỉ người nhận', type: 'input', name: 'addressReceive', value: '' },
	{ label: 'Số điện thoại người nhận', type: 'input', name: 'phoneReceive', value: '' },
	{ label: 'Ghi chú', type: 'textarea', name: 'note', value: '' },
]

export const NAV_ITEM = [
	{
		id: '1', label: 'TFM CLOTHING', to: '/tfm-clothing', nav_nested: [
			{ id: '1.1', label: 'Phụ Kiện', to: '/tfm-clothing/phu-kien' },
			{ id: '1.2', label: 'Quần', to: '/tfm-clothing/quan' },
			{ id: '1.3', label: 'Áo', to: '/tfm-clothing/ao' },
		]
	},
	{
		id: '2', label: 'SNEAKERS', to: '/products?limit=20&page=1', nav_nested: [
			{ id: '2.1', label: 'Adidas', to: '/products?supplier=adidas' },
			{ id: '2.2', label: 'Nike', to: '/products?supplier=nike' },
			{ id: '2.3', label: 'Vans', to: '/products?supplier=vans' },
			{ id: '2.4', label: 'Converse', to: '/products?supplier=converse' },
			{ id: '2.5', label: 'Fila', to: '/products?supplier=fila' },
			{ id: '2.6', label: 'Reebok', to: '/products?supplier=reebok' },
			{ id: '2.7', label: 'Puma', to: '/products?supplier=puma' },
			{ id: '2.8', label: 'Domba', to: '/products?supplier=domba' },
			{ id: '2.9', label: 'Asic', to: '/products?supplier=asic' },
		]
	},
	{ id: '3', label: 'CHAMPION', to: '/champion', nav_nested: [] },
	{ id: '4', label: 'GIẢM GIÁ', to: '/sale', nav_nested: [] },
	{ id: '5', label: 'TIN TỨC', to: '/news', nav_nested: [] }
];

export const BREADBRUMBS = {
	cart: { label: 'Giỏ hàng', to: '/cart' },
	signin: { label: 'Đăng nhập tài khoản', to: '/signin' },
	signup: { label: 'Đăng ký tài khoản', to: '/signup' },
	products: { label: 'Sneakers', to: '/products' },
	adidas: { label: 'Adidas', to: '/products?=adidas' },
	nike: { label: 'Nike', to: '/products?=nike' },
	vans: { label: 'Vans', to: '/products?=vans' },
	converse: { label: 'Converse', to: '/products?=converse' },
	fila: { label: 'Fila', to: '/products?=fila' },
	reebok: { label: 'Reebok', to: '/products?=reebok' },
	puma: { label: 'Puma', to: '/products?=puma' },
	domba: { label: 'Domba', to: '/products?=domba' },
	asic: { label: 'Asic', to: '/products?=asic' },
	account: { label: 'Trang khách hàng', to: '/account' },
	edit: { label: 'Chỉnh sửa thông tin khách hàng', to: '/account/edit' },
	'change-password': { label: 'Đổi mật khẩu', to: '/account/change-password' },
	'order-detail': { label: 'Chi tiết đơn hàng', to: '/order-detail' },
}

export const SUMMARY_ORDER_COLUMNS = [
	{ label: 'Đơn hàng', width: '10%' },
	{ label: 'Ngày', width: '10%' },
	{ label: 'Địa chỉ', width: '10%' },
	{ label: 'Giá trị đơn hàng', width: '10%' },
	{ label: 'TT thanh toán', width: '10%' },
	{ label: 'TT vận chuyển', width: '10%' },
]

export const ORDER_DETAIL_COLUMNS = [
	{ label: 'Ảnh', width: '10%' },
	{ label: 'Giá', width: '10%' },
	{ label: 'Số lượng', width: '10%' },
	{ label: 'Thành tiền', width: '10%' },
]