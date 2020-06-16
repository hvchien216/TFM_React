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
    { id: 1, brand: "adidas", name: "Stan Smith", price: 1390000, discount: 21, img: [a1, a6], rel_img: [a2, a3, a4, a5,] },
    { id: 2, brand: "adidas", name: "Stan Smith - Xám/Trắng", price: 1400000, discount: 10, img: [b1, b6], rel_img: [b2, b3, b4] },
    { id: 3, brand: "adidas", name: "SuperStar - Trắng", price: 1300000, discount: 15, img: [c1, c6], rel_img: [c2, c3, c4, c5] },
    { id: 4, brand: "domba", name: "Domba Moonlake", price: 1290000, discount: 14, img: [d1, d6], rel_img: [] },

]

export const SORT_PAGI = [
    { value: 1, name: 'Tên A → Z' },
    { value: 2, name: 'Tên Z → A' },
    { value: 3, name: 'Giá tăng dần' },
    { value: 4, name: 'Giá giảm dần' },
]