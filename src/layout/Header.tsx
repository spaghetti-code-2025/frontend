import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "aptos";

import { WalletSelector } from "@/components/nodit/WalletSelector";

const Header = () => {
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
        <WalletSelector />
      </AptosWalletAdapterProvider>
    </>
  );
};

export default Header;
