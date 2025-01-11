export interface Novel {
  id: number;
  name: string;
  author: string;
  translation_participant_number: number;
  translation_total_progress: number;
  fee_per_100_chars: number;
  thumbnail_320: string;
  thumbnail: string;

  introduction: string;
  translator_note: string;
  episodes: Episode[];
}

export interface Episode {
  episode_data: string;
  tasks: Task[];
}

export interface Task {
  startSentence: number;
  endSentence: number;
  assign_id: string;
  status: string;
}

export const MOCK_THUMBNAIL_BASE_PATH = "/assets/mocks/novels/thumbnail/";
export const MOCK_TEXT_BASE_PATH = "/assets/mocks/novels/text/";

const NOVELS_MOCKDATA: Novel[] = [
  {
    id: 1,
    name: "무명 식객", // 소설 이름
    author: "무도쟁이", // 작가 이름
    translation_participant_number: 266, // 번역 참여자 수
    translation_total_progress: 0.64, // 총체적 번역 진행도
    fee_per_100_chars: 765, // 100자당 보상 금액 (원)
    thumbnail_320: "1.jpg", // 썸네일 이미지
    thumbnail: "1-full.jpg", // 썸네일 이미지

    // 소설 소개
    introduction:
      "세력 있는 세가에 얹혀 있으면서 문객 노릇을 하는 사람들을 일컫는, 식객. 거느린 식객의 수가 곧 무림세가의 능력을 판단하는 기준의 하나가 된 시대에서 우연히 지방의 한 세가에서 식객 생활을 시작하게 된 한 명의 무인에 의해 천하의 운명이 바뀌기 시작한다.구파일방과 오대세가도 분리되어 있지 않던 과거 전국시대를 배경으로 펼쳐질 장황하고 느린 속도의 서사 무협 활극.",

    // 번역가 노트
    translator_note:
      "본 작품은 비유적인 측면이 중요한 작품입니다. 해당 부분들 신경써서 작업해주세요.",

    // 각 회차 정보
    episodes: [
      {
        episode_data: "1/1.json",
        tasks: [
          {
            startSentence: 0, // 태스크의 시작 문장 인덱스
            endSentence: 0, // 태스크의 끝 문장 인덱스
            assign_id: "#14729130", // 태스크 할당 아이디? 식별 정보?
            status: "assigned", // 태스크 상태
          },
          {
            startSentence: 1,
            endSentence: 1,
            assign_id: "#81932712",
            status: "completed",
          },
        ],
      },
    ],
  },

  {
    id: 2,
    name: "무명 식객", // 소설 이름
    author: "무도쟁이", // 작가 이름
    translation_participant_number: 266, // 번역 참여자 수
    translation_total_progress: 0.64, // 총체적 번역 진행도
    fee_per_100_chars: 765, // 100자당 보상 금액 (원)
    thumbnail_320: "1.jpg", // 썸네일 이미지
    thumbnail: "1-full.jpg", // 썸네일 이미지

    // 소설 소개
    introduction:
      "세력 있는 세가에 얹혀 있으면서 문객 노릇을 하는 사람들을 일컫는, 식객. 거느린 식객의 수가 곧 무림세가의 능력을 판단하는 기준의 하나가 된 시대에서 우연히 지방의 한 세가에서 식객 생활을 시작하게 된 한 명의 무인에 의해 천하의 운명이 바뀌기 시작한다.구파일방과 오대세가도 분리되어 있지 않던 과거 전국시대를 배경으로 펼쳐질 장황하고 느린 속도의 서사 무협 활극.",

    // 번역가 노트
    translator_note:
      "본 작품은 비유적인 측면이 중요한 작품입니다. 해당 부분들 신경써서 작업해주세요.",

    // 각 회차 정보
    episodes: [
      {
        episode_data: "1/1.json",
        tasks: [
          {
            startSentence: 0, // 태스크의 시작 문장 인덱스
            endSentence: 0, // 태스크의 끝 문장 인덱스
            assign_id: "#14729130", // 태스크 할당 아이디? 식별 정보?
            status: "assigned", // 태스크 상태
          },
          {
            startSentence: 1,
            endSentence: 1,
            assign_id: "#81932712",
            status: "completed",
          },
        ],
      },
    ],
  },

  {
    id: 3,
    name: "무명 식객", // 소설 이름
    author: "무도쟁이", // 작가 이름
    translation_participant_number: 266, // 번역 참여자 수
    translation_total_progress: 0.64, // 총체적 번역 진행도
    fee_per_100_chars: 765, // 100자당 보상 금액 (원)
    thumbnail_320: "1.jpg", // 썸네일 이미지
    thumbnail: "1-full.jpg", // 썸네일 이미지

    // 소설 소개
    introduction:
      "세력 있는 세가에 얹혀 있으면서 문객 노릇을 하는 사람들을 일컫는, 식객. 거느린 식객의 수가 곧 무림세가의 능력을 판단하는 기준의 하나가 된 시대에서 우연히 지방의 한 세가에서 식객 생활을 시작하게 된 한 명의 무인에 의해 천하의 운명이 바뀌기 시작한다.구파일방과 오대세가도 분리되어 있지 않던 과거 전국시대를 배경으로 펼쳐질 장황하고 느린 속도의 서사 무협 활극.",

    // 번역가 노트
    translator_note:
      "본 작품은 비유적인 측면이 중요한 작품입니다. 해당 부분들 신경써서 작업해주세요.",

    // 각 회차 정보
    episodes: [
      {
        episode_data: "1/1.json",
        tasks: [
          {
            startSentence: 0, // 태스크의 시작 문장 인덱스
            endSentence: 0, // 태스크의 끝 문장 인덱스
            assign_id: "#14729130", // 태스크 할당 아이디? 식별 정보?
            status: "assigned", // 태스크 상태
          },
          {
            startSentence: 1,
            endSentence: 1,
            assign_id: "#81932712",
            status: "completed",
          },
        ],
      },
    ],
  },

  {
    id: 4,
    name: "무명 식객", // 소설 이름
    author: "무도쟁이", // 작가 이름
    translation_participant_number: 266, // 번역 참여자 수
    translation_total_progress: 0.64, // 총체적 번역 진행도
    fee_per_100_chars: 765, // 100자당 보상 금액 (원)
    thumbnail_320: "1.jpg", // 썸네일 이미지
    thumbnail: "1-full.jpg", // 썸네일 이미지

    // 소설 소개
    introduction:
      "세력 있는 세가에 얹혀 있으면서 문객 노릇을 하는 사람들을 일컫는, 식객. 거느린 식객의 수가 곧 무림세가의 능력을 판단하는 기준의 하나가 된 시대에서 우연히 지방의 한 세가에서 식객 생활을 시작하게 된 한 명의 무인에 의해 천하의 운명이 바뀌기 시작한다.구파일방과 오대세가도 분리되어 있지 않던 과거 전국시대를 배경으로 펼쳐질 장황하고 느린 속도의 서사 무협 활극.",

    // 번역가 노트
    translator_note:
      "본 작품은 비유적인 측면이 중요한 작품입니다. 해당 부분들 신경써서 작업해주세요.",

    // 각 회차 정보
    episodes: [
      {
        episode_data: "1/1.json",
        tasks: [
          {
            startSentence: 0, // 태스크의 시작 문장 인덱스
            endSentence: 0, // 태스크의 끝 문장 인덱스
            assign_id: "#14729130", // 태스크 할당 아이디? 식별 정보?
            status: "assigned", // 태스크 상태
          },
          {
            startSentence: 1,
            endSentence: 1,
            assign_id: "#81932712",
            status: "completed",
          },
        ],
      },
    ],
  },
];

export default NOVELS_MOCKDATA;
