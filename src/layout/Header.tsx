import { AcademicCapIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

import { WalletSelector } from "@/components/nodit/WalletSelector";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        <AcademicCapIcon className="size-7" />
        <div className="gangwon text-xl">bitTranslator</div>
      </div>

      <div className="flex gap-3 items-center">
        <Link to="/submitContent">
          <Button variant="link">번역 의뢰하기</Button>
        </Link>

        <Link to="/review">
          <Button variant="link">번역 검수하기</Button>
        </Link>

        <WalletSelector />
      </div>
    </header>
  );
};

export default Header;
