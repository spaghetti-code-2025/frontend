function translatedParser(html: string): string[] {
  const regex = /<p>(.*?)<\/p>/g; // <p> 태그와 그 안의 내용을 찾는 정규식
  const matches: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1]); // 그룹 1 (p 태그 안의 내용)만 추가
  }

  return matches;
}

export default translatedParser;
