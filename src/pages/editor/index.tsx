import { ArrowUturnLeftIcon, BookOpenIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { getAllNovels } from "@/api/novel";
import { getAllTasks } from "@/api/task";
import { Button } from "@/components/ui/button";
import contentParser from "@/utils/content_parser";
import sentenceParser from "@/utils/sentence_parser";

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

  console.log(thisEpisodesSentencesData);

  const thisNovelsTasksData = tasksData
    ? tasksData.filter((taskData) => taskData.novel_id === novelId)
    : undefined;

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

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
            <Button variant="outline">
              <BookOpenIcon />
              번역 가이드
            </Button>

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
                    onFocus={() => setFocusedIndex(index)} // Set focus index
                    onBlur={() => setFocusedIndex(null)} // Reset focus index
                  />
                </div>
              </div>
            ))}
        </div>

        {/* <div className="h-[500px]" /> */}
        <footer className="pt-4 pb-8 flex gap-4 w-full justify-center mt-10">
          <button className="bg-green text-white font-semibold rounded-full px-20 py-4 text-xl">
            완료
          </button>
        </footer>
      </div>
    </>
  );
};

export default EditorPage;
