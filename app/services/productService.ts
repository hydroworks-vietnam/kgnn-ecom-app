import type { IProduct, IProductListResponse } from '@/types/product';

const PRODUCTS: IProduct[] = [
  {
    id: '1',
    name: 'Hệ thống DWC 5 ngăn tự động',
    category_id: 'dwc',
    unit_price: 2500000,
    unit: 'Bộ',
    images: [
      'https://images.pexels.com/photos/4210854/pexels-photo-4210854.jpeg',
    ],
    price_variants: [{ rank: '1', price: 2500000, unit: 'Bộ', quantity: 1 }],
    description:
      'Hệ thống DWC 5 ngăn tự động với bơm và dinh dưỡng đầy đủ cho trồng rau thủy canh. Thiết kế hiện đại, dễ sử dụng và tiết kiệm không gian.',
    video_link: 'https://www.youtube.com/watch?v=demo1',
  },
  {
    id: '2',
    name: 'Dung dịch dinh dưỡng Flora Series',
    category_id: 'flora',
    unit_price: 450000,
    unit: 'Bộ 3 chai',
    images: [
      'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg',
    ],
    price_variants: [
      { rank: '1', price: 450000, unit: 'Bộ 3 chai', quantity: 1 },
    ],
    description:
      'Bộ 3 dung dịch dinh dưỡng Flora Series (FloraGro, FloraBloom, FloraMicro) chuyên dụng cho trồng rau và cây cảnh. Pha trộn dễ dàng, hiệu quả cao.',
    video_link: 'https://www.youtube.com/watch?v=demo2',
  },
  {
    id: '3',
    name: 'Chất nền Rockwool',
    category_id: 'rockwool',
    unit_price: 150000,
    unit: '10 khối',
    images: [
      'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg',
    ],
    price_variants: [
      { rank: '1', price: 150000, unit: '10 khối', quantity: 1 },
    ],
    description:
      'Chất nền Rockwool nhập khẩu từ châu Âu, độ xốp cao, giữ nước tốt, thích hợp cho ươm hạt và trồng rau thủy canh.',
    video_link: 'https://www.youtube.com/watch?v=demo3',
  },
  {
    id: '4',
    name: 'Đèn LED 1000W full spectrum',
    category_id: 'led',
    unit_price: 3200000,
    unit: 'Cái',
    images: [
      'https://images.pexels.com/photos/7078666/pexels-photo-7078666.jpeg',
    ],
    price_variants: [{ rank: '1', price: 3200000, unit: 'Cái', quantity: 1 }],
    description:
      'Đèn LED 1000W full spectrum với dải phổ rộng, phù hợp cho mọi giai đoạn phát triển của cây. Tiết kiệm điện, độ bền cao.',
    video_link: 'https://www.youtube.com/watch?v=demo4',
  },
  {
    id: '5',
    name: 'Máy bơm nước 500 GPH',
    category_id: 'pumps',
    unit_price: 680000,
    unit: 'Cái',
    images: [
      'https://images.pexels.com/photos/6194156/pexels-photo-6194156.jpeg',
    ],
    price_variants: [{ rank: '1', price: 680000, unit: 'Cái', quantity: 1 }],
    description:
      'Máy bơm nước chuyên dụng cho hệ thống thủy canh, công suất 500 GPH, chạy êm, độ bền cao, chống rò rỉ.',
    video_link: 'https://www.youtube.com/watch?v=demo5',
  },
  {
    id: '6',
    name: 'Đồng hồ đo pH kỹ thuật số',
    category_id: 'ph-meter',
    unit_price: 450000,
    unit: 'Cái',
    images: [
      'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg',
    ],
    price_variants: [{ rank: '1', price: 450000, unit: 'Cái', quantity: 1 }],
    description:
      'Đồng hồ đo pH kỹ thuật số chính xác, dễ sử dụng, pin kéo dài, phù hợp cho kiểm tra dung dịch dinh dưỡng thủy canh.',
    video_link: 'https://www.youtube.com/watch?v=demo6',
  },
  {
    id: '7',
    name: 'Hệ thống NFT 3 tầng',
    category_id: 'nft',
    unit_price: 1800000,
    unit: 'Bộ',
    images: [
      'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg',
    ],
    price_variants: [{ rank: '1', price: 1800000, unit: 'Bộ', quantity: 1 }],
    description:
      'Hệ thống NFT 3 tầng hiện đại, tối ưu không gian, phù hợp trồng rau ăn lá. Dễ lắp đặt và bảo trì.',
    video_link: 'https://www.youtube.com/watch?v=demo7',
  },
  {
    id: '8',
    name: 'Quạt thông gió 6 inch',
    category_id: 'fans',
    unit_price: 520000,
    unit: 'Cái',
    images: [
      'https://mepvn.com/wp-content/uploads/2023/03/quat-thong-gio-cong-nghiep-gan-tuong.jpg',
    ],
    price_variants: [{ rank: '1', price: 520000, unit: 'Cái', quantity: 1 }],
    description:
      'Quạt thông gió 6 inch công suất mạnh, làm mát hiệu quả cho khu vực trồng cây. Thiết kế nhỏ gọn, dễ lắp đặt.',
    video_link: 'https://www.youtube.com/watch?v=demo8',
  },
  {
    id: '9',
    name: 'Giá thể đất nung',
    category_id: 'expanded-clay',
    unit_price: 280000,
    unit: 'Túi',
    images: [
      'https://builderhub.techinfus.com/images/article/thumb/718-0/2020/08/kakoj-byvaet-plotnost-keramzita-1.jpg',
    ],
    price_variants: [{ rank: '1', price: 280000, unit: 'Túi', quantity: 1 }],
    description:
      'Đất sét nở cao cấp, độ tơi xốp cao, thoát nước tốt, thích hợp làm giá thể cho trồng rau và cây cảnh.',
    video_link: 'https://www.youtube.com/watch?v=demo9',
  },
  {
    id: '10',
    name: 'Dừa coir tiền nén 5kg',
    category_id: 'coconut-coir',
    unit_price: 320000,
    unit: 'Gói',
    images: [
      'https://images.pexels.com/photos/5468881/pexels-photo-5468881.jpeg',
    ],
    price_variants: [{ rank: '1', price: 320000, unit: 'Gói', quantity: 1 }],
    description:
      'Dừa coir tiền nén 5kg, thân thiện với môi trường, giữ nước tốt, thích hợp cho ươm hạt và trồng cây.',
    video_link: 'https://www.youtube.com/watch?v=demo10',
  },
  {
    id: '12',
    name: 'Bộ lọc tơ 200 micron',
    category_id: 'filters',
    unit_price: 380000,
    unit: 'Cái',
    images: [
      'https://images.pexels.com/photos/4463796/pexels-photo-4463796.jpeg',
    ],
    price_variants: [{ rank: '1', price: 380000, unit: 'Cái', quantity: 1 }],
    description:
      'Bộ lọc tơ 200 micron, lọc sạch cặn bẩn trong dung dịch dinh dưỡng, bảo vệ máy bơm và hệ thống.',
    video_link: 'https://www.youtube.com/watch?v=demo12',
  },
];

export const fetchProducts = async (page: number = 1, limit: number = 12, categoryId?: number): Promise<IProductListResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = categoryId 
        ? PRODUCTS.filter(p => parseInt(p.id) % 3 === (categoryId % 3))
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

export const fetchProductById = async (id: number): Promise<IProduct | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = PRODUCTS.find(p => parseInt(p.id) === id);
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
