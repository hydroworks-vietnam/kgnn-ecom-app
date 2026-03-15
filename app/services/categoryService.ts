export interface ICategory {
  id: string;
  name: string;
  subcategories?: ICategory[];
}

const CATEGORIES: ICategory[] = [
  {
    id: 'thiet-bi',
    name: 'Thiết Bị Vật Tư Thủy Canh',
    subcategories: [
      { id: 'ong-thuy-canh', name: 'Ống thủy canh' },
      { id: 'phu-kien', name: 'Phụ kiện' },
      { id: 'may-bom', name: 'Máy bơm' },
      { id: 'do-luong', name: 'Đo lường' },
      { id: 'uom-hat', name: 'Ươm hạt' },
    ],
  },
  {
    id: 'mo-hinh',
    name: 'Mô Hình Trồng Rau Thủy Canh',
    subcategories: [
      { id: 'ban-thuy-canh', name: 'Bàn thủy canh' },
      { id: 'nha-kinh', name: 'Nhà kính' },
      { id: 'tru-thuy-canh', name: 'Trụ thủy canh' },
    ],
  },
  {
    id: 'hat-giong',
    name: 'Hạt Giống',
    subcategories: [
      { id: 'ca-chua', name: 'Cà chua' },
      { id: 'xa-lach', name: 'Xà lách' },
      { id: 'cai', name: 'Rau cải' },
      { id: 'khac', name: 'Khác' },
    ],
  },
  {
    id: 'dung-dich',
    name: 'Dung Dịch Thủy Canh',
    subcategories: [
      { id: 'masterblend', name: 'Masterblend' },
    ],
  },
];

const categoryService = {
  fetchCategories: async (): Promise<ICategory[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(CATEGORIES);
      }, 500);
    });
  },
};

export default categoryService;
