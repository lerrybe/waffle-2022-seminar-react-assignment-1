import {
  StoreState,
  StoreDispatches,
} from '../types/context/store-data-states';

// about context states
export const initialStoreData: StoreState = {
  selectedStore: null,
  stores: null,
};

// about dispatch states
export const initialStoreDataActions: StoreDispatches = {
  dispatchSelectedStore() {
    throw new Error('StoreDataContext not provided');
  },
  dispatchStores() {
    throw new Error('StoreDataContext not provided');
  },
};
