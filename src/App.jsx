import React from 'react'
import { Router, RouterProvider } from 'react-router-dom'
import router from './router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
   
  )
}
