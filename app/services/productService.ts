import type { IProduct, IProductListResponse } from '@/types/product';

const PRODUCTS: IProduct[] = [
  // === Thiết Bị Vật Tư Thủy Canh (Equipment & Supplies) ===
  {
    id: '1',
    name: 'Ống Thủy Canh Hydroworks Dòng Cao Cấp – Thiết Kế Độc Quyền',
    category_id: 'ong-thuy-canh',
    unit_price: 58000,
    unit: 'Mét',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/ong-thuy-canh-cao-cap_thuong-hieu-ca-map-1-4-300x300.jpeg',
    ],
    price_variants: [{ rank: '1', price: 58000, unit: 'Mét', quantity: 1 }],
    description: 'Ống thủy canh Hydroworks dòng cao cấp, thiết kế độc quyền thương hiệu Cá Mập. Sản phẩm bán chạy nhất, chất liệu uPVC bền bỉ.',
    video_link: '',
  },
  {
    id: '2',
    name: 'Ống Thủy Canh Lục Giác uPVC – HydroWorks',
    category_id: 'ong-thuy-canh',
    unit_price: 58000,
    unit: 'Mét',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/ong-thuy-canh-luc-giac-1-4-300x300.jpeg',
    ],
    price_variants: [{ rank: '1', price: 58000, unit: 'Mét', quantity: 1 }],
    description: 'Ống thủy canh lục giác màu trắng ổn định nhiệt uPVC HydroWorks. Thiết kế lục giác giúp tăng diện tích tiếp xúc rễ.',
    video_link: '',
  },
  {
    id: '3',
    name: 'Ống Thủy Canh Dưa Lưới (Máng Lớn 75x150mm)',
    category_id: 'ong-thuy-canh',
    unit_price: 75000,
    unit: 'Mét',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/mang-thuy-canh-lon-_ong-dua-luoi-1-4-300x300.jpeg',
    ],
    price_variants: [{ rank: '1', price: 75000, unit: 'Mét', quantity: 1 }],
    description: 'Máng thủy canh lớn 75x150mm dày 2.2mm, chuyên dụng cho trồng dưa lưới và cây dây leo.',
    video_link: '',
  },
  {
    id: '4',
    name: 'Rọ Nhựa Trồng Rau Thủy Canh 50×50',
    category_id: 'phu-kien',
    unit_price: 950,
    unit: 'Cái',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/ro-nhua-50x50-1-4-300x300.jpeg',
    ],
    price_variants: [{ rank: '1', price: 950, unit: 'Cái', quantity: 1 }],
    description: 'Rọ nhựa trồng rau thủy canh kích thước 50x50mm, phù hợp ống thủy canh cao cấp Hydroworks.',
    video_link: '',
  },
  {
    id: '5',
    name: 'Bút Đo PPM (TDS) Dinh Dưỡng Thủy Canh',
    category_id: 'do-luong',
    unit_price: 270000,
    unit: 'Cái',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/but-xiaomi-1-2-300x300.jpeg',
    ],
    price_variants: [{ rank: '1', price: 270000, unit: 'Cái', quantity: 1 }],
    description: 'Bút đo nồng độ dinh dưỡng PPM/TDS chính xác, dễ sử dụng cho kiểm tra dung dịch thủy canh.',
    video_link: '',
  },
  {
    id: '6',
    name: 'Bộ 2 Bút Đo pH và EC BlueLab',
    category_id: 'do-luong',
    unit_price: 5380000,
    unit: 'Bộ',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/but-bluelap-cho-thuy-canh-ph-ec-2-5-300x300.jpeg',
    ],
    price_variants: [{ rank: '1', price: 5380000, unit: 'Bộ', quantity: 1 }],
    description: 'Bộ 2 bút đo pH và EC BlueLab chuyên dùng cho trang trại thủy canh. Độ chính xác cao, bền bỉ.',
    video_link: '',
  },
  {
    id: '7',
    name: 'Máy Bơm Lifetech AP 3500',
    category_id: 'may-bom',
    unit_price: 250000,
    unit: 'Cái',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/may-bom-ap3500-1-2-300x300.jpeg',
    ],
    price_variants: [{ rank: '1', price: 250000, unit: 'Cái', quantity: 1 }],
    description: 'Máy bơm Lifetech AP 3500 công suất mạnh, chạy êm, phù hợp hệ thống thủy canh gia đình và trang trại nhỏ.',
    video_link: '',
  },
  {
    id: '8',
    name: 'Timer – Máy Hẹn Giờ Tự Động',
    category_id: 'phu-kien',
    unit_price: 180000,
    unit: 'Cái',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/70741520_397808030876581_8332275741521608704_n-1-4-300x300.jpeg',
    ],
    price_variants: [{ rank: '1', price: 180000, unit: 'Cái', quantity: 1 }],
    description: 'Máy hẹn giờ tự động điều khiển bơm nước và đèn chiếu sáng, tiện lợi cho hệ thống thủy canh.',
    video_link: '',
  },
  {
    id: '9',
    name: 'Viên Nén Ươm Hạt Xơ Dừa',
    category_id: 'uom-hat',
    unit_price: 750,
    unit: 'Viên',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/vien-nen-uom-hat_hydroworks-1-4-300x300.jpeg',
    ],
    price_variants: [{ rank: '1', price: 750, unit: 'Viên', quantity: 1 }],
    description: 'Viên nén ươm hạt xơ dừa, chất lượng cao, tỷ lệ nảy mầm tốt, thân thiện với môi trường.',
    video_link: '',
  },
  // === Mô Hình Trồng Rau Thủy Canh (Growing Systems) ===
  {
    id: '10',
    name: 'Hệ Thống Thủy Canh Dạng Bàn (5 Ống 1 Mét)',
    category_id: 'ban-thuy-canh',
    unit_price: 1990000,
    unit: 'Bộ',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/H%E1%BB%87-th%E1%BB%91ng-th%E1%BB%A7y-canh-d%E1%BA%A1ng-b%C3%A0n-5-%E1%BB%91ng-1m-2-300x300.jpg',
    ],
    price_variants: [
      { rank: '1', price: 1990000, unit: 'Bộ', quantity: 1 },
      { rank: '2', price: 1890000, unit: 'Bộ', quantity: 5 },
    ],
    description: 'Hệ thống thủy canh dạng bàn 5 ống dài 1 mét, phù hợp cho ban công và sân thượng nhà phố.',
    video_link: '',
  },
  {
    id: '11',
    name: 'Hệ Thống Thủy Canh Dạng Bàn (5 Ống 2 Mét)',
    category_id: 'ban-thuy-canh',
    unit_price: 2550000,
    unit: 'Bộ',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/H%E1%BB%87-Th%E1%BB%91ng-Th%E1%BB%A7y-Canh-D%E1%BA%A1ng-B%C3%A0n-5-%E1%BB%90ng-2-M%C3%A9t--300x300.jpg',
    ],
    price_variants: [
      { rank: '1', price: 2550000, unit: 'Bộ', quantity: 1 },
      { rank: '2', price: 2450000, unit: 'Bộ', quantity: 5 },
    ],
    description: 'Hệ thống thủy canh dạng bàn 5 ống dài 2 mét, diện tích trồng lớn hơn, lý tưởng cho sân thượng.',
    video_link: '',
  },
  {
    id: '12',
    name: 'ComBo Thùng Thủy Canh Tĩnh',
    category_id: 'ban-thuy-canh',
    unit_price: 350000,
    unit: 'Bộ',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2020/03/89919066_497096167832695_3788295389979869184_n-300x300.jpg',
    ],
    price_variants: [{ rank: '1', price: 350000, unit: 'Bộ', quantity: 1 }],
    description: 'Combo thùng thủy canh tĩnh đơn giản, dễ lắp đặt, phù hợp cho người mới bắt đầu trồng thủy canh.',
    video_link: '',
  },
  {
    id: '13',
    name: 'Trụ Thủy Canh',
    category_id: 'tru-thuy-canh',
    unit_price: 2000000,
    unit: 'Bộ',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2020/03/tr%E1%BB%A5-%C4%91%E1%BB%A9ng-tr%E1%BB%93ng-rau-300x300.jpg',
    ],
    price_variants: [{ rank: '1', price: 2000000, unit: 'Bộ', quantity: 1 }],
    description: 'Trụ đứng trồng rau thủy canh, tiết kiệm không gian tối đa, phù hợp ban công và sân thượng nhỏ.',
    video_link: '',
  },
  // === Hạt Giống (Seeds) ===
  {
    id: '14',
    name: 'Cà Chua Beefsteak (Túi 20 Hạt)',
    category_id: 'ca-chua',
    unit_price: 38000,
    unit: 'Túi',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/ca-chua-beefsteak-1-3-300x300.jpeg',
    ],
    price_variants: [{ rank: '1', price: 38000, unit: 'Túi', quantity: 1 }],
    description: 'Hạt giống cà chua Beefsteak quả to, thịt dày, phù hợp trồng thủy canh và đất.',
    video_link: '',
  },
  {
    id: '15',
    name: 'Cà Chua Black Cherry (Túi 20 Hạt)',
    category_id: 'ca-chua',
    unit_price: 38000,
    unit: 'Túi',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/ca-chua-black-cherry-1-4-300x300.jpeg',
    ],
    price_variants: [{ rank: '1', price: 38000, unit: 'Túi', quantity: 1 }],
    description: 'Hạt giống cà chua Black Cherry quả nhỏ, vị ngọt đậm đà, màu tím đen đặc biệt.',
    video_link: '',
  },
  {
    id: '16',
    name: 'Xà Lách Buttercrunch Chịu Nhiệt (Túi 250 Hạt)',
    category_id: 'xa-lach',
    unit_price: 38000,
    unit: 'Túi',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/buttercrunch-1-3-300x300.jpeg',
    ],
    price_variants: [{ rank: '1', price: 38000, unit: 'Túi', quantity: 1 }],
    description: 'Hạt giống xà lách Buttercrunch chịu nhiệt tốt, lá giòn ngọt, trồng quanh năm ở Việt Nam.',
    video_link: '',
  },
  {
    id: '17',
    name: 'Cải Xoăn Scarlet (Túi 200 Hạt)',
    category_id: 'cai',
    unit_price: 38000,
    unit: 'Túi',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/cai-xoan-1-3-300x300.jpeg',
    ],
    price_variants: [{ rank: '1', price: 38000, unit: 'Túi', quantity: 1 }],
    description: 'Hạt giống cải xoăn Scarlet lá đỏ tím đẹp, giàu dinh dưỡng, phù hợp trồng thủy canh.',
    video_link: '',
  },
  {
    id: '18',
    name: 'Cải Hoa Hồng Tatsoi (Túi 250 Hạt)',
    category_id: 'cai',
    unit_price: 38000,
    unit: 'Túi',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/cai-hoa-hong-1-3-300x300.jpeg',
    ],
    price_variants: [{ rank: '1', price: 38000, unit: 'Túi', quantity: 1 }],
    description: 'Hạt giống cải hoa hồng Tatsoi, lá xanh đậm hình thìa, vị ngọt nhẹ, trồng thủy canh rất tốt.',
    video_link: '',
  },
  // === Dung Dịch Thủy Canh (Hydroponic Solutions) ===
  {
    id: '19',
    name: 'Dung Dịch Thủy Canh Masterblend (Size M)',
    category_id: 'masterblend',
    unit_price: 115000,
    unit: 'Bộ',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/75210136_990665674627584_5411344856620466176_n-2-4-300x300.png',
    ],
    price_variants: [{ rank: '1', price: 115000, unit: 'Bộ', quantity: 1 }],
    description: 'Dung dịch thủy canh Masterblend size M, đủ dinh dưỡng cho cây phát triển khỏe mạnh.',
    video_link: '',
  },
  {
    id: '20',
    name: 'Dung Dịch Thủy Canh Masterblend Home Growing (Size 4M)',
    category_id: 'masterblend',
    unit_price: 410000,
    unit: 'Bộ',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/dinh-duong-thuy-canh-masterblend-size-lon-1-4-300x300.jpeg',
    ],
    price_variants: [
      { rank: '1', price: 410000, unit: 'Bộ', quantity: 1 },
      { rank: '2', price: 390000, unit: 'Bộ', quantity: 5 },
    ],
    description: 'Dung dịch thủy canh Masterblend Home Growing size 4M, tiết kiệm hơn, phù hợp gia đình.',
    video_link: '',
  },
  {
    id: '21',
    name: 'Dung Dịch Thủy Canh Masterblend Combo 6 Hộp Size 4M',
    category_id: 'masterblend',
    unit_price: 2310000,
    unit: 'Combo',
    images: [
      'https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/dinh-duong-thuy-canh-my-masterblend-1-4-300x300.jpeg',
    ],
    price_variants: [
      { rank: '1', price: 2310000, unit: 'Combo', quantity: 1 },
    ],
    description: 'Combo 6 hộp dung dịch thủy canh Masterblend size 4M, tiết kiệm chi phí cho trang trại quy mô lớn.',
    video_link: '',
  },
];

export const fetchProducts = async (page: number = 1, limit: number = 12, categoryId?: string | string[]): Promise<IProductListResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = categoryId 
        ? PRODUCTS.filter(p => Array.isArray(categoryId) ? categoryId.includes(p.category_id) : p.category_id === categoryId)
        : PRODUCTS;
      
      const start = (page - 1) * limit;
      const paginatedProducts = filteredProducts.slice(start, start + limit);
      
      resolve({
        products: paginatedProducts,
        total: filteredProducts.length,
        page,
        limit,
      });
    }, 500);
  });
};

export const fetchProductById = async (id: string): Promise<IProduct | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = PRODUCTS.find(p => p.id === id);
      resolve(product || null);
    }, 300);
  });
};

export const fetchFeaturedProducts = async (limit: number = 4): Promise<IProduct[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PRODUCTS.slice(0, limit));
    }, 300);
  });
};

const productService = {
  fetchProducts,
  fetchProductById,
  fetchFeaturedProducts,
};

export default productService;
