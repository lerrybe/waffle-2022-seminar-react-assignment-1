import { useEffect } from 'react';

import EntryRoute from './routes';
import { useSessionActionsContext } from './context/SessionContext';

const App: React.FC = () => {
  const { refresh } = useSessionActionsContext()!;

  useEffect(() => {
    refresh();
  }, []);

  return <EntryRoute />;
};

export default App;
