import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import './index.css'
// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const queryClient=new QueryClient();

createRoot(document.getElementById("root")!).render(
    
  <React.Fragment>
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>
  </React.Fragment>
);
