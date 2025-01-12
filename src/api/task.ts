import api from "./api";

interface TaskResponse {
  length: number;
  start: number;
  end: number;
  id: number;
  translated: string;
  status: "PENDING" | "IN_PROGRESS" | "DONE";
  trans_hash: string;
  participantAddress: string;
  novel_id: number;
}

export const getAllTasks = async () => {
  const response = await api.get<TaskResponse[]>("/task");

  return response.data;
};

interface PostTaskRequest {
  novel_id: number;
  length: number;
  start: number;
  end: number;
}

export const postTask = async (requestData: PostTaskRequest) => {
  const response = await api.post<TaskResponse>("/task", requestData);

  return response.data;
};

interface PostTranslationRequest {
  id: number;
  translated: string;
}

export const postTranslation = async (requestData: PostTranslationRequest) => {
  const response = await api.post("/task/translated", requestData);

  return response.data;
};

interface AssertReviewRequest {
  id: number;
}

export const postAssertReview = async (requestData: AssertReviewRequest) => {
  const response = await api.post("/task/review", requestData);

  return response.data;
};

export const getAllPendingTasks = async () => {
  const response = await api.get<TaskResponse>("/task/pending");

  return response.data;
};
