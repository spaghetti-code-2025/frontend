import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getAllTasks } from "@/api/task";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Novel } from "@/mocks/novels/novels";
import contentParser from "@/utils/content_parser";

import NovelThumbnail from "./NovelThumbnail";

const NovelDialogue = (novel: Novel) => {
  const novelContents = contentParser(novel.content, novel.separator);

  const { data: tasksData } = useQuery({
    queryKey: ["get", "/task"],
    queryFn: getAllTasks,
  });

  const thisNovelsTasksData = tasksData
    ? tasksData.filter((taskData) => taskData.novel_id === novel.id)
    : undefined;

  return (
    <Dialog>
      <DialogTrigger>
        <NovelThumbnail {...novel} />
      </DialogTrigger>

      <DialogContent className="min-w-[900px]">
        <DialogHeader>
          <DialogTitle>
            <div className="text-xl danjo">{novel.name}</div>
          </DialogTitle>
          <p className="text-sm text-greyDark font-semibold">{novel.author}</p>
        </DialogHeader>

        <DialogDescription></DialogDescription>

        <div className="flex gap-2">
          <div className="w-1/2">
            <h3 className="font-bold text-xl mb-2">줄거리</h3>
            <p className="pr-2 tracking-tight">{novel.introduction}</p>

            <h3 className="font-bold text-xl mt-8 mb-2">번역가 노트</h3>
            <p className="pr-2 tracking-tight">{novel.translator_note}</p>
          </div>
          <div className="w-[1px] bg-neutral-200 h-full"></div>
          <div className="w-1/2">
            {novelContents.map((content, index) => (
              <EpisodeSelectionButton
                key={index}
                novelId={novel.id}
                episodeNumber={index + 1}
                title={content.textThumbnail}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface EpisodeSelectionButtonProps {
  novelId: number;
  episodeNumber: number;
  title: string;
}

const EpisodeSelectionButton = ({
  novelId,
  episodeNumber,
  title,
}: EpisodeSelectionButtonProps) => {
  return (
    <Link to={`/editor?novelId=${novelId}&episodeNumber=${episodeNumber}`}>
      <button className="flex w-full box-border px-3 py-4 items-center justify-between gap-5 hover:bg-slate-100 transition rounded-md">
        <div>
          <span className="font-semibold">{episodeNumber}화.</span> {title}
        </div>

        <div>완료</div>
      </button>
    </Link>
  );
};

export default NovelDialogue;
