export interface Store {
  id: number;
  storeCategory: string;
  name: string;
  description: string;
  location: string;
  images: string[];
  junaeb: boolean;
}

export interface StoreWithRating extends Store {
  averageRating: number;
}

export interface StoreItem {
  id: number;
  name: string;
  storeId: number;
  description: string;
  picture: string;
  price: number;
}

export interface StoreReview {
  id: number;
  storeId: number;
  rating: number;
  comment: string;
  userName?: string;
  picture?: string;
}

export interface StoreWithDetails extends Store {
  items: StoreItem[];
  reviews: StoreReview[];
  averageRating: number;
}

export interface StoresResponse {
  stores: Store[];
  total: number;
}