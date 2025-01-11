import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Network } from "aptos";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layout/Layout";
import EditorPage from "./pages/editor";
import HomePage from "./pages/home";
import ReviewPage from "./pages/review";
import SubmitContent from "./pages/submitContent";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />}>
          <Route element={<HomePage />} path="/" />
        </Route>
        <Route element={<EditorPage />} path="/editor" />
        <Route element={<SubmitContent />} path="/submitContent" />
        <Route element={<ReviewPage />} path="/review" />
      </>,
    ),
  );

  const queryClient = new QueryClient();

  return (
    <>
      <AptosWalletAdapterProvider
        autoConnect={true}
        optInWallets={["Petra"]}
        dappConfig={{
          network: Network.MAINNET,
          aptosApiKey: import.meta.env.VITE_NODIT_API_KEY,
        }}
        onError={(error) => {
          console.log("error", error);
        }}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AptosWalletAdapterProvider>
    </>
  );
}

export default App;
