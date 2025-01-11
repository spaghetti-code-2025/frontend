import NOVELS_MOCKDATA from "src/mocks/novels/novels";

import NovelDialogue from "./components/NovelDialogue";

const HomePage = () => {
  const novels = NOVELS_MOCKDATA;

  return (
    <div className="w-full flex justify-center">
      <main className="max-w-[1020px] w-full flex gap-8 p-8">
        <section className="w-full">
          <h1 className="text-4xl font-bold mb-6">내가 번역한 소설들</h1>
          <div className="grid grid-cols-4 gap-3">
            {novels.map((novel) => (
              <NovelDialogue {...novel} key={novel.id} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
