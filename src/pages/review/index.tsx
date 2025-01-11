import { Button } from "@/components/ui/button.tsx";
import React from "react";

const ReviewPage = () => {
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
              “어느 누가 몇이나 나서든 ... ~ 하지만 그 사이를 노리고 재차
              떨어지는...
            </div>
          </div>

          <div className="w-full flex justify-center">
            <Button className="w-[90px] m-4" variant="outline" type="button">
              Reject
            </Button>
            <Button className="w-[90px] m-4" variant="outline" type="button">
              Approve
            </Button>
          </div>
        </main>
      </div>
    </>
  );
};

export default ReviewPage;
