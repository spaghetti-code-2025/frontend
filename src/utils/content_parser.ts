const SLICE_LENGTH = 15;

const contentParser = (content: string, separator: number[]) => {
  const result: { original: string; textThumbnail: string }[] = [];
  let startIndex = 0;

  for (const index of separator) {
    if (index >= content.length) {
      throw new Error("Separator index exceeds content length");
    }

    const original = content.slice(startIndex, index + 1); // index까지 포함
    const textThumbnail =
      original.length > SLICE_LENGTH
        ? original.slice(0, SLICE_LENGTH) + "..."
        : original;
    result.push({ original, textThumbnail });
    startIndex = index + 1; // 다음 조각 시작점 설정
  }

  // 마지막 남은 문자열 처리
  if (startIndex < content.length) {
    const original = content.slice(startIndex);
    const textThumbnail =
      original.length > SLICE_LENGTH
        ? original.slice(0, SLICE_LENGTH) + "..."
        : original;
    result.push({ original, textThumbnail });
  }

  return result;
};

export default contentParser;
