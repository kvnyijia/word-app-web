import { fetchWrapper } from "./fetchWrapper";

export const userServices = {
  createUser,
  login,
  getAccounts,
};

function createUser(jsonData) {
  return fetchWrapper.post("http://localhost:8080/users", jsonData)
    .then(async ({res, ok}) => {
      let resJson = await res.json();
      return {resJson, ok};
    });
}

function login(jsonData) {
  return fetchWrapper.post("http://localhost:8080/users/login", jsonData)
    .then(async ({res, ok}) => {
      let resJson = res;
      if (resJson?.access_token) {
        localStorage.setItem("authtoken", resJson.access_token);
      }
      if (resJson?.user) {
        localStorage.setItem("loginUser", JSON.stringify(resJson.user));
      }
      return {res: resJson, ok};
      // return {res, ok};
    })
    .catch((err) => {
      console.log(err);
      return {res: err, ok: false};
    });
}

function getAccounts() {
  return fetchWrapper.get("http://localhost:8080/accounts?page_id=1&page_size=5")
    .then(async ({res, ok}) => {
      let status = res.status;
      let resJson = await res.json();
      return {resJson, ok, status};
    });
}

function getAnAccount() {
  return fetchWrapper.get("http://localhost:8080/accounts/464")
    .then(async ({res, ok}) => {
      let resJson = await res.json();
      return resJson;
    });
}
