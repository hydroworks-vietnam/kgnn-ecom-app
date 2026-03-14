export interface ICategory {
  id: string;
  name: string;
  subcategories?: ICategory[];
}

const CATEGORIES: ICategory[] = [
  {
    id: 'systems',
    name: 'Hệ thống thủy canh',
    subcategories: [
      { id: 'nft', name: 'NFT' },
      { id: 'dwc', name: 'DWC' },
      { id: 'ebb-flow', name: 'Ebb & Flow' },
    ],
  },
  {
    id: 'nutrients',
    name: 'Dinh dưỡng',
    subcategories: [
      { id: 'general', name: 'General Hydroponics' },
      { id: 'flora', name: 'Flora Series' },
      { id: 'maxigro', name: 'Maxigro' },
    ],
  },
  {
    id: 'growth-media',
    name: 'Chất trồng',
    subcategories: [
      { id: 'rockwool', name: 'Rockwool' },
      { id: 'expanded-clay', name: 'Đất sét nở' },
      { id: 'coconut-coir', name: 'Dừa coir' },
    ],
  },
  {
    id: 'lighting',
    name: 'Đèn trồng',
    subcategories: [
      { id: 'led', name: 'LED' },
      { id: 'hps', name: 'HPS' },
      { id: 'mh', name: 'MH' },
    ],
  },
  {
    id: 'air-water',
    name: 'Không khí & Nước',
    subcategories: [
      { id: 'pumps', name: 'Máy bơm' },
      { id: 'fans', name: 'Quạt' },
      { id: 'filters', name: 'Bộ lọc' },
    ],
  },
  {
    id: 'monitoring',
    name: 'Giám sát',
    subcategories: [
      { id: 'ph-meter', name: 'Đo pH' },
      { id: 'ec-meter', name: 'Đo EC' },
      { id: 'thermometer', name: 'Đo nhiệt độ' },
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
