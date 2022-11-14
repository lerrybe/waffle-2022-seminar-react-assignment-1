import { createContext, useContext, useMemo, useState } from 'react';
import {
  initialStores,
  initialSelectedStore,
  initialStoreDataActions,
} from '../data/initialStoreDataStates';

const StoreDataContext = createContext({
  initialStores,
  initialSelectedStore,
});
const StoreDataActionsContext = createContext(initialStoreDataActions);

function StoreDataProvider({ children }) {
  const [stores, setStores] = useState(initialStores);
  const [selectedStore, setSelectedStore] = useState(initialSelectedStore);
  const actions = useMemo(
    () => ({
      dispatchStores(newStores) {
        setStores(newStores);
      },
      dispatchSelectedStore(newStore) {
        setSelectedStore(newStore);
      },
    }),
    [],
  );

  return (
    <StoreDataActionsContext.Provider value={actions}>
      <StoreDataContext.Provider value={{ stores, selectedStore }}>
        {children}
      </StoreDataContext.Provider>
    </StoreDataActionsContext.Provider>
  );
}
export const useStoreDataContext = () => useContext(StoreDataContext);
export const useStoreDataActionsContext = () => useContext(StoreDataActionsContext);

export default StoreDataProvider;
