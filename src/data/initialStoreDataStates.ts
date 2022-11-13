import { Store } from '../types/owners';

// about context states
export interface State {
  selectedStore?: Store | null;
  stores?: Store[] | null;
}

export const initialStoreData: State = {
  selectedStore: null,
  stores: null,
};

// about dispatch states
export interface Dispatches {
  dispatchStores: (newStores: Store[] | null) => void;
  dispatchSelectedStore: (newStore: Store | null) => void;
}

export const initialStoreDataActions: Dispatches = {
  dispatchSelectedStore() {
    throw new Error('StoreDataContext not provided');
  },
  dispatchStores() {
    throw new Error('StoreDataContext not provided');
  },
};
