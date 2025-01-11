import { WalletSelector } from "@/nodit/WalletSelector.tsx";
import { Network } from "@aptos-labs/ts-sdk";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";

const HomePage = () => {
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
      <WalletSelector />
    </AptosWalletAdapterProvider>
  );
};

export default HomePage;
