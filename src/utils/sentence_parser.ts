const sentenceParser = (text: string): string[] => {
  // 정규식을 사용하여 문장을 나누는 패턴
  const sentenceRegex =
    /(?:(?:[^.?!]+(?:\.\.\.|[.?!]))|(?:["“][^"”]*["”])|(?:\([^)]*\.\)))/g;

  // 입력 텍스트에서 패턴에 맞는 문장을 추출
  const matches = text.match(sentenceRegex);

  // 공백을 제거하고 null을 방지
  return matches ? matches.map((sentence) => sentence.trim()) : [];
};

export default sentenceParser;
