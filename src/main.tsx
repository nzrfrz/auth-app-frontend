import ReactDOM from 'react-dom/client'
import { 
  BrowserRouter, 
  Routes, 
  Route, 
} from "react-router-dom";
import { GlobalContextProvider } from './context/GlobalContextProvider.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import App from './App.tsx'
import './index.css'
import 'antd/dist/reset.css'

const queryClientInstance = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClientInstance}>
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  </QueryClientProvider>,
)
