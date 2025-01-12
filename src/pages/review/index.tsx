import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ReviewPage = () => {
  const { signAndSubmitTransaction, account, connected } = useWallet();
  const { toast } = useToast();

  const handleAcceptTranslation = async () => {
    if (!connected || !account) {
      toast({
        variant: "destructive",
        title: "지갑 연결 필요",
        description: "지갑을 먼저 연결해주세요!",
      });
      return;
    }

    // 더미 데이터
    const dummyData = {
      requestId: "5",
      startIdx: 0,
      endIdx: 1,
      translatedContentHash: "0x123456789abcdef",
      translatorAccountId:
        "0x88c6c92d91c4f34c739cdc0c2c4735be3f3d263c87877af3966d804ffb6a2590",
    };

    const payload: InputTransactionData = {
      data: {
        function:
          "67a5c0efdea05102041bb5b2bb8d52f271742baa4b6f15aee1a1d048010890f1::translation_request::accept_translation_pr",
        typeArguments: [],
        functionArguments: [
          dummyData.requestId,
          dummyData.startIdx,
          dummyData.endIdx,
          dummyData.translatedContentHash,
          dummyData.translatorAccountId,
        ],
      },
    };

    try {
      if (!signAndSubmitTransaction) {
        throw new Error("Wallet is not connected");
      }
      const txnHash = await signAndSubmitTransaction(payload);
      console.log("Transaction hash:", txnHash);
      toast({
        title: "승인 성공",
        description: "번역이 성공적으로 승인되었습니다.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "승인 실패",
        description: "번역 승인 중 오류가 발생했습니다.",
      });
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <main className="max-w-[600px] w-full py-10">
          <h1 className="text-3xl font-bold my-4">번역 검수하기</h1>

          <div className="p-4 border-[1px] border-neutral-200 w-full rounded-lg">
            <div className="flex w-full justify-between items-center">
              <div className="text-xl font-bold">무명 식객</div>
            </div>

            <div className="flex gap-2 my-1">
              <div>10화</div>
              <div>100자</div>
            </div>

            <div className="text-sm text-greyDark">
              &quot;어느 누가 몇이나 나서든 ... ~ 하지만 그 사이를 노리고 재차
              떨어지는...&quot;
            </div>
          </div>

          <div className="w-full flex justify-center">
            <Button className="w-[90px] m-4" variant="outline" type="button">
              Reject
            </Button>
            <Button
              className="w-[90px] m-4"
              variant="outline"
              type="button"
              onClick={handleAcceptTranslation}
            >
              Approve
            </Button>
          </div>
        </main>
      </div>
    </>
  );
};

export default ReviewPage;
