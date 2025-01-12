import { ArrowUturnLeftIcon, BookOpenIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { getAllNovels } from "@/api/novel";
import {
  getAllTasks,
  postAssertReview,
  postTask,
  postTranslation,
} from "@/api/task";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import contentParser from "@/utils/content_parser";
import sentenceParser from "@/utils/sentence_parser";
import translatedParser from "@/utils/translated_parser";

import DynamicTextarea from "./components/DynamicTextarea";

const EditorPage = () => {
  const [searchParams] = useSearchParams();
  const novelId = Number(searchParams.get("novelId"));
  const episodeNumber = Number(searchParams.get("episodeNumber"));

  const { data: novelsData } = useQuery({
    queryKey: ["get", "/novel"],
    queryFn: getAllNovels,
  });

  const { data: tasksData } = useQuery({
    queryKey: ["get", "/task"],
    queryFn: getAllTasks,
  });

  const thisNovelsData = novelsData
    ? novelsData.filter((novelData) => novelData.id === novelId)
    : undefined;

  const thisNovelsEpisodeData =
    thisNovelsData?.length === 1
      ? contentParser(thisNovelsData[0].content, thisNovelsData[0].separator)[
          episodeNumber - 1
        ]
      : undefined;

  const thisEpisodesSentencesData = thisNovelsEpisodeData
    ? sentenceParser(thisNovelsEpisodeData.original)
    : undefined;

  const thisNovelsTasksData = tasksData
    ? tasksData.filter((taskData) => taskData.novel_id === novelId)
    : undefined;

  const thisEpisodesTasksData = thisNovelsTasksData
    ? thisNovelsTasksData.filter(
        (taskData) =>
          thisNovelsData &&
          taskData.end === thisNovelsData[0].separator[episodeNumber - 1],
      )
    : undefined;

  const thisEpisodesTaskData =
    thisEpisodesTasksData?.length === 1 ? thisEpisodesTasksData[0] : undefined;

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const [editStatus, setEditStatus] = useState<
    "IN_PROGRESS" | "DONE" | "PENDING" | "OCCUPIED" | null
  >(null);

  useEffect(() => {
    if (!thisEpisodesTaskData) return;

    if (thisEpisodesTaskData.status === "IN_PROGRESS") {
      const userWalletAddress = localStorage.getItem("wallet_address");
      if (!userWalletAddress) return;

      if (thisEpisodesTaskData?.participantAddress === userWalletAddress) {
        setEditStatus("IN_PROGRESS");
      } else {
        setEditStatus("OCCUPIED");
      }
    }

    if (thisEpisodesTaskData.status === "PENDING") {
      setEditStatus("PENDING");
    }

    if (thisEpisodesTaskData.status === "DONE") {
      setEditStatus("DONE");
    }
  }, [thisEpisodesTaskData]);

  const postTaskMutation = useMutation({
    mutationFn: postTask,
    onSuccess: () => {
      setEditStatus("IN_PROGRESS");
    },
  });

  const handlePostTask = () => {
    if (!thisNovelsData) return;
    const start =
      episodeNumber === 1
        ? 0
        : thisNovelsData[0].separator[episodeNumber - 2] + 1;
    const end = thisNovelsData[0].separator[episodeNumber - 1];

    postTaskMutation.mutate({
      novel_id: novelId,
      start,
      end,
      length: end - start,
    });
  };

  const [sentencesValues, setSentencesValues] = useState<string[]>([]);

  useEffect(() => {
    if (thisEpisodesTaskData && thisEpisodesTaskData?.translated.length > 0) {
      const parsedSentences = translatedParser(thisEpisodesTaskData.translated);
      setSentencesValues(parsedSentences);
    }
  }, [thisEpisodesTaskData]);

  const handleTextareaChange = (index: number, newValue: string) => {
    setSentencesValues((prev) => {
      const updated = [...prev];
      updated[index] = newValue;
      return updated;
    });
  };

  const isFinalSubmissionValid =
    thisEpisodesSentencesData &&
    sentencesValues.length === thisEpisodesSentencesData.length &&
    sentencesValues.every((sentence) => sentence && sentence.length > 0);

  const postTranslationMutation = useMutation({
    mutationFn: postTranslation,
  });

  const handleSubmitTranslation = async () => {
    if (!thisEpisodesTaskData) return;

    const sentences = sentencesValues
      .map((sentence) => `<p>${sentence ?? ""}</p>`)
      .join("");

    postTranslationMutation.mutate({
      id: thisEpisodesTaskData.id,
      translated: sentences,
    });
  };

  const assertReviewMuatation = useMutation({
    mutationFn: postAssertReview,
    onSuccess: () => {
      setEditStatus("PENDING");
    },
  });

  const handleAssertReview = async () => {
    if (!isFinalSubmissionValid || !thisEpisodesTaskData) return;
    await handleSubmitTranslation();

    assertReviewMuatation.mutate({ id: thisEpisodesTaskData.id });
  };

  return (
    <>
      {thisNovelsData?.[0] && (
        <header className="w-full flex items-center justify-between py-5 pb-2 px-8 sticky top-0 bg-white z-10">
          <div className="flex items-center">
            <div className="text-2xl danjo mr-4">{thisNovelsData[0].title}</div>
            <div className="text-base text-greyDark font-semibold">
              {thisNovelsData[0].author}
            </div>

            <div className="h-8 w-[1px] bg-neutral-200 mx-8" />

            <div className="text-base text-greyDark">{episodeNumber}</div>
            <div className="w-8 h-[1.5px] bg-neutral-400 mx-2" />
            <div className="text-base text-greyDark">
              {thisNovelsEpisodeData?.textThumbnail}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {editStatus ? (
              <div className="flex items-center gap-3">
                <div
                  className={`size-3 rounded-full ${(editStatus === "PENDING" || editStatus === "OCCUPIED") && "bg-yellow"} ${editStatus === "DONE" && "bg-neutral-400"} ${editStatus === "IN_PROGRESS" && "bg-green"}`}
                />

                <div className="text-greyDark font-semibold text-sm mr-3">
                  {editStatus === "PENDING" && "검수 중"}
                  {editStatus === "OCCUPIED" && "다른 이에 의해 번역 중"}
                  {editStatus === "DONE" && "번역 완료됨"}
                  {editStatus === "IN_PROGRESS" && "당신이 작업 중"}
                </div>
              </div>
            ) : (
              <Button onClick={handlePostTask}>번역 시작</Button>
            )}

            <Dialog>
              <DialogTrigger>
                <Button variant="outline">
                  <BookOpenIcon />
                  번역 가이드
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader className="font-bold text-2xl">
                  번역 가이드
                </DialogHeader>
                <DialogDescription>{thisNovelsData[0].notes}</DialogDescription>
              </DialogContent>
            </Dialog>

            <Link to="/">
              <Button variant="ghost">
                <ArrowUturnLeftIcon />
                돌아가기
              </Button>
            </Link>
          </div>

          <div className="absolute w-full left-0 top-full h-12 bg-gradient-to-b from-white"></div>
        </header>
      )}

      <div className="w-screen flex flex-col justify-between items-center gap-8 my-12">
        <div className="max-w-[1200px] w-full flex flex-col grow gap-6 relative">
          <div className="w-[1px] h-full bg-neutral-200 left-1/2 absolute top-0" />

          {thisEpisodesSentencesData &&
            thisEpisodesSentencesData.length > 0 &&
            thisEpisodesSentencesData.map((sentence, index) => (
              <div key={index} className="flex w-full">
                {/* Sentence Section */}
                <div className="w-1/2 py-2 px-8 box-border">
                  <p
                    className={`${
                      focusedIndex === index ? "bg-green bg-opacity-30" : ""
                    }`}
                  >
                    {sentence}
                  </p>
                </div>

                {/* Textarea Section */}
                <div className="w-1/2 py-2 px-8 box-border">
                  <DynamicTextarea
                    placeholder={sentence}
                    value={sentencesValues[index]}
                    onChange={(value) => handleTextareaChange(index, value)} // Update state on change
                    onFocus={() => setFocusedIndex(index)} // Set focus index
                    onBlur={() => setFocusedIndex(null)} // Reset focus index
                    disabled={editStatus !== "IN_PROGRESS"}
                  />
                </div>
              </div>
            ))}
        </div>

        {editStatus === "IN_PROGRESS" && (
          <footer className="pt-4 pb-8 flex gap-4 w-full justify-center mt-10">
            <button
              onClick={handleSubmitTranslation}
              className="bg-green text-white font-semibold rounded-full px-20 py-4 text-xl"
            >
              초안 저장
            </button>

            <button
              onClick={handleAssertReview}
              className={`${isFinalSubmissionValid ? "bg-yellow text-white" : "bg-neutral-200 text-grey"} font-semibold rounded-full px-20 py-4 text-xl`}
            >
              검수 요청
            </button>
          </footer>
        )}
      </div>
    </>
  );
};

export default EditorPage;
