import React, { useState } from "react";

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
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    intro: "",
    notes: "",
    price: 0,
    length: 0,
    reviewer_id: "",
  });

  const [contents, setContents] = useState([
    { content: "", start_index: 0, end_index: 0 },
  ]);

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

  const removeContentField = (index: number) => {
    setContents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      contents,
    };

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full flex justify-center py-10">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-xl">Register Content</CardTitle>
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
                <Label htmlFor="reviewer_id">검수자</Label>
                <Input
                  id="reviewer_id"
                  name="reviewer_id"
                  placeholder=""
                  value={formData.reviewer_id}
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
              <div className="flex flex-col">
                <Label className="text-[15px]" htmlFor="reviewer_id">
                  원문
                </Label>
                {contents.map((content, index) => (
                  <div key={index} className="flex">
                    <textarea
                      className="w-full h-[200px] my-1 border border-gray-200 rounded-lg focus:outline-black focus:outline-1 p-2"
                      placeholder={`에피소드 ${index + 1}`}
                      value={content.content}
                      onChange={(e) =>
                        handleContentChange(index, "content", e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={addContentField}
                type="button"
                className="mt-2"
              >
                + Add Episode
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubmitContent;
