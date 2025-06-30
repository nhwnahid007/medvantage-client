import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./Providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
   <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className="container mx-auto font-openSans ">
            <RouterProvider router={router} />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#4aed88',
                },
              },
              error: {
                duration: 4000,
                theme: {
                  primary: '#ff4b4b',
                },
              },
            }}
          />
        </HelmetProvider>
   </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
