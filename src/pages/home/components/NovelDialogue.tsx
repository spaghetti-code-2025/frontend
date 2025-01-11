import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Novel } from "@/mocks/novels/novels";

import NovelThumbnail from "./NovelThumbnail";

const NovelDialogue = (novel: Novel) => {
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
            <EpisodeSelectionButton episodeNumber={1} title="에엑따" />
            <EpisodeSelectionButton episodeNumber={2} title="에엑따" />
            <EpisodeSelectionButton episodeNumber={3} title="에엑따" />
            <EpisodeSelectionButton episodeNumber={4} title="에엑따" />
            <EpisodeSelectionButton episodeNumber={5} title="에엑따" />
            <EpisodeSelectionButton episodeNumber={6} title="에엑따" />
            <EpisodeSelectionButton episodeNumber={7} title="에엑따" />
            <EpisodeSelectionButton episodeNumber={8} title="에엑따" />
            <EpisodeSelectionButton episodeNumber={9} title="에엑따" />
            <EpisodeSelectionButton episodeNumber={10} title="에엑따" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface EpisodeSelectionButtonProps {
  episodeNumber: number;
  title: string;
}

const EpisodeSelectionButton = ({
  episodeNumber,
  title,
}: EpisodeSelectionButtonProps) => {
  return (
    <button className="flex w-full box-border px-3 py-2 items-center justify-between gap-5 hover:bg-slate-100 transition rounded-md">
      <div className="text-lg">
        <span className="font-semibold">{episodeNumber}화.</span> {title}
      </div>

      <div>완료</div>
    </button>
  );
};

export default NovelDialogue;
