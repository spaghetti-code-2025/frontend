import { WalletSelector } from "@/components/nodit/WalletSelector";

const Header = () => {
  return (
    <div className="flex justify-end p-4">
      <WalletSelector />
    </div>
  );
};

export default Header;
