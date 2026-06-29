import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const uploadPaper = async (formData: FormData) => {
  return axios.post(`${API}/upload`, formData);
};

export const getSummary = async (paperId: string) => {
  return axios.get(`${API}/summary/${paperId}`);
};

export const getQuiz = async (paperId: string) => {
  return axios.get(`${API}/quiz/${paperId}`);
};

export const getNotes = async (paperId: string) => {
  return axios.get(`${API}/notes/${paperId}`);
};

export const askPaper = async (
  paperId: string,
  question: string
) => {
  return axios.post(`${API}/chat/${paperId}`, {
    question,
  });
};