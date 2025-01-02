import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./index.css";
import { Toaster } from "@/components/ui/toaster.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./features/auth/context";
// Create a new router instance
const router = createRouter({ routeTree, context: { auth: undefined! } });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const queryClient = new QueryClient();
const App = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />
}
createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <StrictMode>
      <QueryClientProvider client={queryClient} >
        <AuthProvider>
          <App />
        </AuthProvider>
        <Toaster />
      </QueryClientProvider>
    </StrictMode>
  </React.Fragment>
);
