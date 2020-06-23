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
    { id: 4, nameBrand: 'Domba', brand: "domba", name: "Domba Moonlake", price: 1290000, discount: 14, img: [d1, d6], rel_img: [], size: [41, 42] },

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
            { id: 1, name: 'Giá dưới 1.000.000đ' },
            { id: 2, name: '1.000.000đ - 2.000.000đ' },
            { id: 3, name: '2.000.000đ - 3.000.000đ' },
            { id: 4, name: '3.000.000đ - 5.000.000đ' },
        ],
    },
    {
        id: 2, name: 'brand', title: "HÃNG", items: [
            { id: 1, name: 'Adidas', value: 'adidas' },
            { id: 2, name: 'Asics', value: 'asics' },
            { id: 3, name: 'Champion', value: 'champion' },
            { id: 4, name: 'Converse', value: 'converse' },
            { id: 5, name: 'Domba', value: 'domba' },
            { id: 6, name: 'Fila', value: 'fila' },
            { id: 7, name: 'MLB', value: 'mlb' },
            { id: 8, name: 'New Balance', value: 'newbalance' },
            { id: 9, name: 'Nike', value: 'nike' },
            { id: 10, name: 'Puma', value: 'puma' },
            { id: 11, name: 'Reebok', value: 'reebok' },
            { id: 12, name: 'Vans', value: 'vans' },
        ]
    },
    {
        id: 3, name: 'size', title: "SIZE", items: [
            { id: 1, name: '35', value: 35 },
            { id: 2, name: '35.5', value: 35.5 },
            { id: 3, name: '36', value: 36 },
            { id: 4, name: '36.5', value: 36.5 },
            { id: 5, name: '37', value: 37 },
            { id: 6, name: '38', value: 38 },
            { id: 7, name: '38.5', value: 38.5 },
            { id: 8, name: '39', value: 39 },
            { id: 9, name: '40', value: 40 },
            { id: 10, name: '40.5', value: 40.5 },
            { id: 11, name: '41', value: 41 },
            { id: 12, name: '42', value: 42 },
            { id: 13, name: '42.5', value: 42.5 },
            { id: 14, name: '43', value: 43 },
            { id: 15, name: '44', value: 44 },
            { id: 16, name: '44.5', value: 44.5 },
            { id: 17, name: '45', value: 45 },
        ]
    }
]

export const CHECKOUT_MAIN_FIELDS = [
    { label: 'Email', type: 'input', name: 'email', value: '' },
    { label: 'Họ và tên', type: 'input', name: 'name', value: '' },
    { label: 'Số điện thoại', type: 'input', name: 'phone', value: '' },
    { label: 'Địa chỉ', type: 'input', name: 'address', value: '' },
    { label: 'Giao hàng đến địa chỉ khác', type: 'checkbox', name: 'anotherAddress', value: false },
    { label: 'Ghi chú', type: 'textarea', name: 'note', value: '' },
]

export const ANOTHER_ADDRESS = [
    { label: 'Họ và tên', type: 'input', name: 'nameReceive', value: '' },
    { label: 'Địa chỉ', type: 'input', name: 'addressReceive', value: '' },
    { label: 'Số điện thoại', type: 'input', name: 'phoneReceive', value: '' },
]