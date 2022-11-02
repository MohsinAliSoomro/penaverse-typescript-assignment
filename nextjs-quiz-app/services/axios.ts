import axios from "axios";
import { IQuestion } from "../types";

export const getQuestions = async (): Promise<IQuestion[] | null> => {
  try {
    const response = await axios.get(
      "https://the-trivia-api.com/api/questions?categories=science&limit=5"
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
