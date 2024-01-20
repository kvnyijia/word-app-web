import { apiUrl } from "./config";
import { fetchWrapper } from "./fetchWrapper";

export const wordServices = {
  createWord,
  getWords,
  getWord,
  deleteWord,
};

function createWord(jsonData) {
  return fetchWrapper.post(`${apiUrl}/words`, jsonData)
    .then(async ({resJson, ok}) => {
      return {resJson, ok};
    });
}

function getWords(table_id) {
  return fetchWrapper.get(`${apiUrl}/words?table_id=${table_id}`)
    .then(async ({resJson, ok}) => {
      return {resJson, ok};
    });
}

function getWord(word_id) {
  return fetchWrapper.get(`${apiUrl}/words/${word_id}`)
    .then(async ({resJson, ok}) => {
      return {resJson, ok};
    });
}

function deleteWord(word_id) {
  return fetchWrapper._delete(`${apiUrl}/words/${word_id}`)
    .then(async ({resJson, ok}) => {
      return {resJson, ok};
    });
}
