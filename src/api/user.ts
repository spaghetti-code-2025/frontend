import api from "./api";

interface LoginRequest {
  address: string;
  secret?: string;
}

interface LoginResponse {
  token: string;
}

export const login = async (requestData: LoginRequest) => {
  const response = await api.post<LoginResponse>("/user/login", {
    secret: requestData.secret ?? "",
    ...requestData,
  });

  return response.data;
};
