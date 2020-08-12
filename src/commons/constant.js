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
			{ id: 2, name: 'Giá dưới 1.000.000đ', value: { min_amount: null, max_amount: 1000000 } },
			{ id: 3, name: '1.000.000đ - 2.000.000đ', value: { min_amount: 1000000, max_amount: 2000000 } },
			{ id: 4, name: '2.000.000đ - 3.000.000đ', value: { min_amount: 2000000, max_amount: 3000000 } },
			{ id: 5, name: '3.000.000đ - 5.000.000đ', value: { min_amount: 3000000, max_amount: 5000000 } },
			{ id: 6, name: 'Trên 5.000.000đ', value: { min_amount: 5000000, max_amount: null } },
		],
	},
	{
		id: 2, name: 'brand', title: "HÃNG", items: [
			{ id: 1, name: 'Tất cả hãng', value: { supplier: null } },
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
			{ id: 14, name: 'TFM-Clothing', value: { supplier: 'clothing' } },
		]
	},
	{
		id: 3, name: 'size sneakers', title: "SIZE GIÀY", items: [
			{ id: 1, name: 'Tất cả size', value: { size: null } },
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
	},
	{
		id: 4, name: 'size clothing', title: "SIZE QUẦN ÁO", items: [
			{ id: 1, name: 'Tất cả size', value: { size: null } },
			{ id: 2, name: 'S', value: { size: 'S' } },
			{ id: 3, name: 'L', value: { size: 'L' } },
			{ id: 4, name: 'M', value: { size: 'M' } },
			{ id: 5, name: 'XL', value: { size: 'XL' } },
			{ id: 6, name: 'XXL', value: { size: 'XXL' } },
		]
	}
]

export const CHECKOUT_MAIN_FIELDS = [
	{ label: 'Email', type: 'text', name: 'email', value: '' },
	{ label: 'Họ và tên', type: 'text', name: 'name', value: '' },
	{ label: 'Số điện thoại', type: 'text', name: 'phone', value: '' },
	{ label: 'Địa chỉ', type: 'text', name: 'address', value: '' },
	{ label: 'Giao hàng đến địa chỉ khác', type: 'checkbox', name: 'anotherAddress', value: false },
	{ label: 'Họ và tên người nhận', type: 'text', name: 'nameReceive', value: '' },
	{ label: 'Địa chỉ người nhận', type: 'text', name: 'addressReceive', value: '' },
	{ label: 'Số điện thoại người nhận', type: 'text', name: 'phoneReceive', value: '' },
	{ label: 'Ghi chú', type: 'textarea', name: 'note', value: '' },
]

export const NAV_ITEM = [
	{
		id: '1', label: 'TFM CLOTHING', to: null, nav_nested: [
			{ id: '1.1', label: 'Phụ Kiện', to: '/collections/phu-kien' },
			{ id: '1.2', label: 'Quần', to: '/collections/quan' },
			{ id: '1.3', label: 'Áo', to: '/collections/ao' },
		]
	},
	{
		id: '2', label: 'SNEAKERS', to: null, nav_nested: [
			{ id: '2.1', label: 'Adidas', to: '/collections/adidas' },
			{ id: '2.2', label: 'Nike', to: '/collections/nike' },
			{ id: '2.3', label: 'Vans', to: '/collections/vans' },
			{ id: '2.4', label: 'Converse', to: '/collections/converse' },
			{ id: '2.5', label: 'Fila', to: '/collections/fila' },
			{ id: '2.6', label: 'Reebok', to: '/collections/reebok' },
			{ id: '2.7', label: 'Puma', to: '/collections/puma' },
			{ id: '2.8', label: 'Domba', to: '/collections/domba' },
			{ id: '2.9', label: 'Asic', to: '/collections/asic' },
		]
	},
	{ id: '3', label: 'CHAMPION', to: '/collections/champion', nav_nested: [] },
	{ id: '4', label: 'GIẢM GIÁ', to: '/collections/giam-gia', nav_nested: [] },
	{ id: '5', label: 'Tin tức', to: '/news', nav_nested: [] }
];

export const BREADBRUMBS = {
	'cart': { label: 'Giỏ hàng', to: '/cart' },
	'signin': { label: 'Đăng nhập tài khoản', to: '/signin' },
	'signup': { label: 'Đăng ký tài khoản', to: '/signup' },
	'champion': { label: 'Champion', to: '/collections/champion' },
	// 'dasc': { label: 'Dasc', to: '/collections/dasc' },
	'adidas': { label: 'Adidas', to: '/collections/adidas' },
	'nike': { label: 'Nike', to: '/collections/nike' },
	'vans': { label: 'Vans', to: '/collections/vans' },
	'converse': { label: 'Converse', to: '/collections/converse' },
	'fila': { label: 'Fila', to: '/collections/fila' },
	'reebok': { label: 'Reebok', to: '/collections/reebok' },
	'puma': { label: 'Puma', to: '/collections/puma' },
	'domba': { label: 'Domba', to: '/collections/domba' },
	'asic': { label: 'Asic', to: '/collections/asic' },
	'account': { label: 'Trang khách hàng', to: '/account' },
	'phu-kien': { label: 'Phụ kiện', to: '/collections/phu-kien' },
	'ao': { label: 'Áo', to: '/collections/ao' },
	'quan': { label: 'Quần', to: '/collections/quan' },
	'search': { label: 'Tìm kiếm', to: '/search' },
	'giam-gia': { label: 'Giảm giá', to: '/collections/giam-gia' },
	'edit': { label: 'Chỉnh sửa thông tin khách hàng', to: '/account/edit' },
	'change-password': { label: 'Đổi mật khẩu', to: '/account/change-password' },
	'order-detail': { label: 'Chi tiết đơn hàng', to: '/order-detail' },
	'checkout': { label: 'Đặt hàng', to: '/checkout' },
}

export const SUMMARY_ORDER_COLUMNS = [
	{ label: 'Đơn hàng', width: '10%' },
	{ label: 'Ngày', width: '10%' },
	// { label: 'Địa chỉ', width: '10%' },
	{ label: 'Giá trị đơn hàng', width: '10%' },
	{ label: 'TT người nhận', width: '10%' },
	{ label: 'TT vận chuyển', width: '10%' },
]

export const ORDER_DETAIL_COLUMNS = [
	{ label: 'Ảnh', width: '10%' },
	{ label: 'Giá', width: '10%' },
	{ label: 'Số lượng', width: '10%' },
	{ label: 'Thành tiền', width: '10%' },
]

export const TRANSPORT_STATUSES = {
	new: 'Đang xác nhận',
	success: 'Đã thanh toán',
	shipping: 'Đang vận chuyển',
	canceled: 'Hủy đơn hàng',
}

export const PRODUCT_STATUSES = {
	'new': 'Sản phẩm mới',
	'on_sale': 'Đang giảm giá',
	'best_seller': 'Sản phẩm bán chạy',
	'sold_out': 'Hết hàng',
}

export const CONVERT_SLUG_CATEGORY_TO_ID = {
	'phu-kien': 2,
	'champion': 15,
	'quan': 3,
	'ao': 4,
	'giam-gia': 17,
	'nike': 7,
	'adidas': 6,
	'converse': 9,
	'vans': 8,
	'domba': 13,
	'asic': 14,
	'puma': 12,
	'reebok': 18,
	'fila': 10,
}