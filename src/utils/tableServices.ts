import { apiUrl } from "./config";
import { fetchWrapper } from "./fetchWrapper";

export const tableServices = {
  createTable,
  getTables,
  getTable,
  deleteTable,
};

function createTable(jsonData) {
  return fetchWrapper.post(`${apiUrl}/tables`, jsonData)
    .then(async ({resJson, ok}) => {
      return {resJson, ok};
    });
}

function getTables(username) {
  return fetchWrapper.get(`${apiUrl}/tables?owner=${username}`)
    .then(async ({resJson, ok}) => {
      return {resJson, ok};
    });
}

function getTable(table_id) {
  return fetchWrapper.get(`${apiUrl}/tables/${table_id}`)
    .then(async ({resJson, ok}) => {
      return {resJson, ok};
    });
}

function deleteTable(table_id) {
  return fetchWrapper._delete(`${apiUrl}/tables/${table_id}`)
    .then(async ({resJson, ok}) => {
      return {resJson, ok};
    });
}
