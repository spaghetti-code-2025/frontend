import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getAllNovels } from "@/api/novel";
import { getAllTasks } from "@/api/task";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import sentenceParser from "@/utils/sentence_parser";
import translatedParser from "@/utils/translated_parser";

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

  const { data: taskDatas } = useQuery({
    queryKey: ["/task", "get"],
    queryFn: getAllTasks,
  });

  const { data: novelDatas } = useQuery({
    queryKey: ["/novel", "get"],
    queryFn: getAllNovels,
  });

  return (
    <>
      <div className="w-full flex justify-center">
        <main className="max-w-[600px] w-full py-10">
          <Link to="/" className="text-sm font-medium">
            돌아가기
          </Link>

          <h1 className="text-3xl font-bold my-4">번역 검수하기</h1>

          {taskDatas &&
            novelDatas &&
            taskDatas
              .filter((task) => task.status === "PENDING")
              .map((task) => {
                const novel = novelDatas.find(
                  (novel) => novel.id === task.novel_id,
                );

                if (!novel) return;

                return (
                  <div
                    key={task.id}
                    className="p-4 border-[1px] border-neutral-200 w-full rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex w-full justify-between items-center">
                          <div className="text-xl font-bold">
                            {novel?.title}
                          </div>
                        </div>

                        <div className="flex gap-2 my-1">
                          <div>{task.length}자</div>
                        </div>
                      </div>

                      <Dialog>
                        <DialogTrigger>
                          <Button>번역본 보기</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <h2 className="text-xl font-semibold">원문</h2>

                          {sentenceParser(
                            novel.content.slice(task.start, task.end + 1),
                          ).map((sentence, index) => (
                            <p key={index}>{sentence}</p>
                          ))}

                          <h2 className="text-xl font-semibold mt-4">번역본</h2>
                          {translatedParser(task.translated).map(
                            (sentence, index) => (
                              <p key={index}>{sentence}</p>
                            ),
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="w-full flex justify-center gap-3 mt-4">
                      <Button
                        className="w-[90px]"
                        variant="outline"
                        type="button"
                      >
                        Reject
                      </Button>
                      <Button
                        className="w-[90px]"
                        variant="outline"
                        type="button"
                        onClick={handleAcceptTranslation}
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                );
              })}
        </main>
      </div>
    </>
  );
};

export default ReviewPage;
