import api from "./api";

interface NovelResponse {
  id: number;
  title: string;
  author: string;
  intro: string;
  notes: string;

  price: number;
  length: number;
  content: string;
  separator: number[];

  image_url?: string;

  reviewer_address: string;
  progress: number;
  per_chars: number;
  hash: string;
}

export const getAllNovels = async () => {
  const response = await api.get<NovelResponse[]>("/novel");

  return response.data;
};
