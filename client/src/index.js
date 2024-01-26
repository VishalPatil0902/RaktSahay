import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { url } from './Global/URL';
import axios from 'axios';


const BASE_URL = url;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ({ queryKey, type = 'get' }) => {
        if (type === 'get') {
          return axios.get(`${BASE_URL}${queryKey}`).then(response => response.data);
        }
      }
    }
  }
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.unregister();

reportWebVitals();
