import { useQuery } from "@tanstack/react-query";

import { getAllNovels } from "@/api/novel";

import NovelDialogue from "./components/NovelDialogue";

const HomePage = () => {
  const { data: novelsData } = useQuery({
    queryKey: ["get", "/novel"],
    queryFn: getAllNovels,
  });

  return (
    <div className="w-full flex justify-center">
      <main className="max-w-[1020px] w-full flex gap-8 p-8">
        <section className="w-full">
          <h1 className="text-4xl font-bold mb-6">등록된 소설들</h1>
          <div className="grid grid-cols-4 gap-3">
            {novelsData &&
              novelsData.map((novel) => (
                <NovelDialogue
                  key={novel.id}
                  id={novel.id}
                  name={novel.title}
                  author={novel.author}
                  thumbnail_320={novel.image_url}
                  introduction={novel.intro}
                  translator_note={novel.notes}
                  translation_total_progress={novel.progress}
                  fee_per_100_chars={novel.per_chars}
                  content={novel.content}
                  separator={novel.separator}
                />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
