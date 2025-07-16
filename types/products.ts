export interface IProduct {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: ICategory;
  images: string[];
}

export interface ICategory {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface INewProduct {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}
