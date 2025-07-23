import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import { HelmetProvider } from 'react-helmet-async';
import AuthContext, { AuthProvider } from './Provider/AuthContext.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

let queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContext>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className=''>
            <RouterProvider router={router}></RouterProvider>
          </div>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthContext>
  </StrictMode>,
)
