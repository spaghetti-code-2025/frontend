import { AcademicCapIcon, CurrencyDollarIcon } from "@heroicons/react/20/solid";
import { MOCK_THUMBNAIL_BASE_PATH, Novel } from "src/mocks/novels/novels";

interface NovelThumbnailProps
  extends Pick<
    Novel,
    | "id"
    | "name"
    | "author"
    | "thumbnail_320"
    | "translation_total_progress"
    | "fee_per_100_chars"
  > {}

const NovelThumbnail = (novel: NovelThumbnailProps) => {
  return (
    <div
      className="text-left flex flex-col min-h-[450px] w-full rounded-lg overflow-hidden border-[0.5px] border-[#E1E1E1]"
      key={novel.id}
    >
      {novel.thumbnail_320 ? (
        <img
          src={`${MOCK_THUMBNAIL_BASE_PATH}/${novel.thumbnail_320}`}
          className="w-full"
        />
      ) : (
        <div className="w-full h-[183.2px] bg-neutral-200 flex justify-center items-center">
          <AcademicCapIcon className="size-16 text-white" />
        </div>
      )}

      <div className="flex flex-col px-3 pt-3 pb-4 w-full justify-between grow">
        <div>
          <h1 className="text-xl danjo">{novel.name}</h1>
          <p className="text-sm text-greyDark font-semibold">{novel.author}</p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div>
            <div className="text-grey text-xs mb-1">번역 진행도</div>

            <div className="flex items-center gap-2">
              <div className="border-[#E0E0E0] border-[0.5px] rounded-full bg-white grow">
                <div
                  className="bg-green rounded-full h-[5px]"
                  style={{
                    width: `${novel.translation_total_progress * 100}%`,
                  }}
                />
              </div>

              <div className="text-greyDark text-xs">
                {novel.translation_total_progress * 100}%
              </div>
            </div>
          </div>

          <div className="flex items-center w-full justify-between">
            <div className="flex items-center text-grey">
              <CurrencyDollarIcon className="size-5 mr-1" />
              <div className="text-sm font-medium">100자당</div>
            </div>

            <div className="text-lg danjo">
              {novel.fee_per_100_chars}
              <span className="text-sm danjo">원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovelThumbnail;
