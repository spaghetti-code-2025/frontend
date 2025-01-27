import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SubmitContent = () => {
  const { signAndSubmitTransaction, account, connected } = useWallet();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    intro: "",
    notes: "",
    price: "",
    length: 0,
    reviewer_address: "",
  });

  const [contents, setContents] = useState([
    { content: "", start_index: 0, end_index: 0 },
  ]);

  const handleCreateTranslationRequest = async (
    requestId: string,
    reviewerAccountId: string,
    contentHash: string,
    totalPrice: number,
    contentLength: number,
  ) => {
    if (!connected || !account) {
      alert("지갑을 먼저 연결해주세요!");
      return;
    }

    const payload: InputTransactionData = {
      data: {
        function:
          "590655b1d402206ee2c348d04535026f0cad98f52b1b270f3ac5f16cbf5176a0::translation_request::create_translation_request",
        typeArguments: [],
        functionArguments: [
          requestId,
          reviewerAccountId,
          contentHash,
          totalPrice * Math.pow(10, 8),
          contentLength,
        ],
      },
    };

    try {
      if (!signAndSubmitTransaction) {
        throw new Error("Wallet is not connected");
      }
      const txnHash = await signAndSubmitTransaction(payload);
      console.log("Transaction hash:", txnHash);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    setContents((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const addContentField = () => {
    setContents((prev) => [
      ...prev,
      { content: "", start_index: 0, end_index: 0 },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(formData.price);

    const separator: number[] = [];

    let currentIndex = 0;

    contents.forEach((content) => {
      currentIndex += content.content.trim().length;
      separator.push(currentIndex - 1);
    });

    const totalLength = contents.reduce(
      (sum, content) => sum + content.content.trim().length,
      0,
    );

    const payload = {
      ...formData,
      content: contents.map((item) => item.content.trim()).join(""),
      separator,
      length: totalLength,
      price: price * Math.pow(10, 8),
    };

    try {
      const response = await fetch("http://98.80.100.119:3000/novel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("의뢰 요청이 성공했어요 🙂");
        const body = await response.json();

        console.log(body);

        setFormData({
          title: "",
          author: "",
          intro: "",
          notes: "",
          price: "",
          length: 0,
          reviewer_address: "",
        });

        setContents([{ content: "", start_index: 0, end_index: 0 }]);

        try {
          await handleCreateTranslationRequest(
            body.id.toString(),
            formData.reviewer_address,
            body.hash,
            price,
            totalLength,
          );
          console.log("Translation request created successfully");
        } catch (error) {
          console.error("Failed to create translation request:", error);
        }
      } else {
        alert("의뢰 요청이 실패했어요 😞");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full flex justify-center py-10">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-xl">번역 의뢰하기</CardTitle>
          {!connected && (
            <div className="mt-2 text-sm text-red-500">
              지갑 연결이 필요합니다
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder=""
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="author">저자</Label>
                <Input
                  id="author"
                  name="author"
                  placeholder=""
                  value={formData.author}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="intro">줄거리</Label>
                <Input
                  id="intro"
                  name="intro"
                  placeholder=""
                  value={formData.intro}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="reviewer_address">검수자 계좌</Label>
                <Input
                  id="reviewer_address"
                  name="reviewer_address"
                  placeholder=""
                  value={formData.reviewer_address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="notes">번역 시 주의사항</Label>
                <Input
                  id="notes"
                  name="notes"
                  placeholder=""
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="author">의뢰비 (Aptos)</Label>
                <Input
                  id="price"
                  name="price"
                  placeholder=""
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col">
                <Label className="text-[14px]" htmlFor="reviewer_id">
                  원문
                </Label>
                {contents.map((content, index) => (
                  <div key={index} className="flex">
                    <textarea
                      className="w-full h-[200px] text-[14px] my-1 border border-gray-200 rounded-lg focus:outline-black focus:outline-1 p-3"
                      placeholder={`에피소드 ${index + 1}`}
                      value={content.content}
                      onChange={(e) =>
                        handleContentChange(index, "content", e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
              <Button variant="outline" onClick={addContentField} type="button">
                + 에피소드 추가하기
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to="/" className="no-underline">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button className="bg-[#69D200]" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubmitContent;
