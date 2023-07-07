export interface Product {
  id: number;
  name: string;
  description?: any;
  total_price: string;
  image: string;
  discount: string;
  status: number;
  extra: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  ingredients: Array<object>;
}
