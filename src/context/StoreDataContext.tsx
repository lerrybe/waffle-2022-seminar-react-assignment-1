import { createContext, useContext, useState } from 'react';
import {
  State,
  Dispatches,
  initialStoreData,
  initialStoreDataActions,
} from '../data/initialStoreDataStates';
import { Store } from '../types/owners';

const StoreDataContext = createContext<State | null>(initialStoreData);
const StoreDataActionsContext = createContext<Dispatches | null>(
  initialStoreDataActions,
);

interface StoreDataProvider {
  children: React.ReactNode;
}

function StoreDataProvider({ children }: StoreDataProvider) {
  const [stores, setStores] = useState<Store[] | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const dispatchStores = (newStores: Store[] | null): void => {
    setStores(newStores);
  };

  const dispatchSelectedStore = (newStore: Store | null): void => {
    setSelectedStore(newStore);
  };

  return (
    <StoreDataActionsContext.Provider
      value={{
        dispatchStores,
        dispatchSelectedStore,
      }}
    >
      <StoreDataContext.Provider value={{ stores, selectedStore }}>
        {children}
      </StoreDataContext.Provider>
    </StoreDataActionsContext.Provider>
  );
}
export const useStoreDataContext = () => useContext(StoreDataContext);
export const useStoreDataActionsContext = () =>
  useContext(StoreDataActionsContext);

export default StoreDataProvider;
