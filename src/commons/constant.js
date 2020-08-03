import a1 from './../assets/stan-smith-shoes-white-m20605-01-standard.jpg';
import a2 from './../assets/Stan_Smith_Shoes_White_M20605_02_standard.jpg';
import a3 from './../assets/Stan_Smith_Shoes_White_M20605_03_standard.jpg';
import a4 from './../assets/Stan_Smith_Shoes_White_M20605_04_standard.jpg';
import a5 from './../assets/Stan_Smith_Shoes_White_M20605_05_standard.jpg';
import a6 from './../assets/stan-smith-shoes-white-m20605-01-standard_sm.jpg';
import b1 from './../assets/stan-smith-shoes-white-cq2206-01-standard.jpg';
import b2 from './../assets/Stan_Smith_Shoes_White_CQ2206_02_standard.jpg';
import b3 from './../assets/Stan_Smith_Shoes_White_CQ2206_03_standard.jpg';
import b4 from './../assets/Stan_Smith_Shoes_White_CQ2206_04_standard.jpg';
import b6 from './../assets/stan-smith-shoes-white-cq2206-01-standard_sm.jpg';
import c1 from './../assets/superstar-shoes-white-aq6278-01-standard.jpg';
import c2 from './../assets/Superstar_Shoes_White_AQ6278_02_standard.jpg';
import c3 from './../assets/Superstar_Shoes_White_AQ6278_03_detail.jpg';
import c4 from './../assets/Superstar_Shoes_White_AQ6278_04_standard.jpg';
import c5 from './../assets/Superstar_Shoes_White_AQ6278_05_standard.jpg';
import c6 from './../assets/superstar-shoes-white-aq6278-01-standard_sm.jpg';
import d1 from './../assets/1993238-l.jpg';
import d6 from './../assets/1993238-l_sm.jpg';

export const API_ALL_PROVINCE = 'https://api.mysupership.vn/v1/partner/areas/province';
export const API_DISTRICT_OF_PROVINCE = '/v1/partner/areas/district?province=';

export const API_PRODUCT = [
	{ id: 1, nameBrand: 'Adidas', brand: "adidas", name: "Stan Smith", price: 1390000, discount: 0, img: [a1, a6], rel_img: [a2, a3, a4, a5,], size: [39, 40] },
	{ id: 2, nameBrand: 'Adidas', brand: "adidas", name: "Stan Smith - Xám/Trắng", price: 1400000, discount: 10, img: [b1, b6], rel_img: [b2, b3, b4], size: [39, 42] },
	{ id: 3, nameBrand: 'Adidas', brand: "adidas", name: "SuperStar - Trắng", price: 1300000, discount: 15, img: [c1, c6], rel_img: [c2, c3, c4, c5], size: [38, 39] },
	{ id: 4, nameBrand: 'Domba', brand: "domba", name: "aaaaaaaaa", price: 2290000, discount: 14, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 5, nameBrand: 'Domba', brand: "domba", name: "bbbbbbbbb", price: 1490000, discount: 59, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 6, nameBrand: 'Domba', brand: "domba", name: "ccccccccc", price: 1240000, discount: 22, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 7, nameBrand: 'Domba', brand: "domba", name: "ddddddddd", price: 3290000, discount: 55, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 8, nameBrand: 'Domba', brand: "domba", name: "eeeeeeeee", price: 7290000, discount: 44, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 9, nameBrand: 'Domba', brand: "domba", name: "fffffffff", price: 1000000, discount: 54, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 10, nameBrand: 'Domba', brand: "domba", name: "gggggggg", price: 1990000, discount: 12, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 11, nameBrand: 'Domba', brand: "domba", name: "hhhhhhhh", price: 5290000, discount: 77, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 12, nameBrand: 'Domba', brand: "domba", name: "iiiiiiiiii", price: 9290000, discount: 87, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 13, nameBrand: 'Domba', brand: "domba", name: "jjjjjjjjjj", price: 1390000, discount: 65, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 14, nameBrand: 'Domba', brand: "domba", name: "kkkkkkkkkkk", price: 1690000, discount: 24, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 15, nameBrand: 'Domba', brand: "domba", name: "lllllllllll", price: 1390000, discount: 65, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 16, nameBrand: 'Domba', brand: "domba", name: "mmmmmmmmmmm", price: 1090000, discount: 37, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 17, nameBrand: 'Domba', brand: "domba", name: "nnnnnnnnnnn", price: 1270000, discount: 85, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 18, nameBrand: 'Domba', brand: "domba", name: "ooooooooooo", price: 3290000, discount: 29, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 19, nameBrand: 'Domba', brand: "domba", name: "rrrrrrrrrrr", price: 8290000, discount: 19, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 20, nameBrand: 'Domba', brand: "domba", name: "qqqqqqqqqqqqq", price: 5240000, discount: 25, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 21, nameBrand: 'Domba', brand: "domba", name: "ttttttttttt", price: 3460000, discount: 90, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 22, nameBrand: 'Domba', brand: "domba", name: "xxxxxxxxxxxxx", price: 1480000, discount: 11, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 23, nameBrand: 'Domba', brand: "domba", name: "zzzzzzzzzzzz", price: 8670000, discount: 66, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 24, nameBrand: 'Domba', brand: "domba", name: "ppppppppp", price: 2370000, discount: 44, img: [d1, d6], rel_img: [], size: [41, 42] },
	{ id: 25, nameBrand: 'Domba', brand: "domba", name: "vvvvvvvv", price: 8760000, discount: 77, img: [d1, d6], rel_img: [], size: [41, 42] },

]

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