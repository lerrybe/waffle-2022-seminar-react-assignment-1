import { Store } from '../owners';

export interface StoreState {
  selectedStore?: Store | null;
  stores?: Store[] | null;
}

export interface StoreDispatches {
  dispatchStores: (newStores: Store[] | null) => void;
  dispatchSelectedStore: (newStore: Store | null) => void;
}
