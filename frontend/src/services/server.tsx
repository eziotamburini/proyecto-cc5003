import axios from "axios";
import type {
  Store,
  StoreItem,
  StoreReview,
  StoreWithDetails,
  StoreWithRating,
} from "../types/types";

const baseUrl = "http://localhost:3000/";

const getAllStores = (): Promise<Store[]> => {
  return axios.get(`${baseUrl}stores`).then((response) => response.data);
};

const getStoreById = (id: number): Promise<Store> => {
  return axios.get(`${baseUrl}stores/${id}`).then((response) => response.data);
};

const getAllStoreItems = (): Promise<StoreItem[]> => {
  return axios.get(`${baseUrl}storeItems`).then((response) => response.data);
};

const getStoreItemsByStoreId = (storeId: number): Promise<StoreItem[]> => {
  return axios.get(`${baseUrl}storeItems?storeId=${storeId}`).then((response) => response.data);
};

const getStoreItemById = (id: number): Promise<StoreItem> => {
  return axios.get(`${baseUrl}storeItems/${id}`).then((response) => response.data);
};

const getAllStoreReviews = (): Promise<StoreReview[]> => {
  return axios.get(`${baseUrl}storeReviews`).then((response) => response.data);
};

const getStoreReviewsByStoreId = (storeId: number): Promise<StoreReview[]> => {
  return axios.get(`${baseUrl}storeReviews?storeId=${storeId}`).then((response) => response.data);
};

const getStoreReviewById = (id: number): Promise<StoreReview> => {
  return axios.get(`${baseUrl}storeReviews/${id}`).then((response) => response.data);
};

const createStoreReview = (review: Omit<StoreReview, "id">): Promise<StoreReview> => {
  return axios.post(`${baseUrl}storeReviews`, review).then((response) => response.data);
};

const getStoreWithDetails = (storeId: number): Promise<StoreWithDetails> => {
  return Promise.all([
    getStoreById(storeId),
    getStoreItemsByStoreId(storeId),
    getStoreReviewsByStoreId(storeId),
  ])
    .then(([store, items, reviews]) => {
      const averageRating =
        reviews.length > 0
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : 0;

      return {
        ...store,
        items,
        reviews,
        averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      };
    })
    .catch((error) => {
      throw new Error(`Failed to fetch store details: ${error}`);
    });
};

const getStoresWithAverageRating = (): Promise<StoreWithRating[]> => {
  return Promise.all([getAllStores(), getAllStoreReviews()])
    .then(([stores, reviews]) => {
      return stores.map((store) => {
        const storeReviews = reviews.filter(
          (review) => Number(review.storeId) === Number(store.id),
        );

        const averageRating =
          storeReviews.length > 0
            ? storeReviews.reduce((sum, review) => sum + review.rating, 0) / storeReviews.length
            : 0;

        return {
          ...store,
          averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
        };
      });
    })
    .catch((error) => {
      throw new Error(`Failed to fetch stores with ratings: ${error}`);
    });
};

export default {
  getAllStores,
  getStoreById,
  getStoresWithAverageRating,

  getAllStoreItems,
  getStoreItemsByStoreId,
  getStoreItemById,

  getAllStoreReviews,
  getStoreReviewsByStoreId,
  getStoreReviewById,
  createStoreReview,

  getStoreWithDetails,
};
