import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "aptos";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

function App() {
  return (
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
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AptosWalletAdapterProvider>
  );
}

export default App;
