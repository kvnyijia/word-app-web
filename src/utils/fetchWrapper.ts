
export const fetchWrapper = {
  get, 
  post,
};

function get(url: string) {
  const reqOptions = {
    method: "GET",
    headers: {...authHeader(url)},
  } as any;
  return fetch(url, reqOptions).then(handleRes);
}

function post(url: string, jsonData) {
  const reqOptions = {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(jsonData), 
  } as any;
  return fetch(url, reqOptions).then(handleRes);
}

// return auth header with auth token if user is logged in and request is to the api url
function authHeader(url: string) {
  const token = localStorage.getItem("authtoken");
  const isApiUrl = true;  // url.startsWith("localhost");
  if (token && isApiUrl) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

async function handleRes(res: Response) {
  let ok = false;
  if (res.ok) {    
    ok = true;
  } else {
    console.log("bad res status code");
  }
  const data = await res.json();
  return {res: data, ok};
}
