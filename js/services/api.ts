const baseHeaders = (): Headers => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  return myHeaders;
};

const defaultHeaders = (): Headers => {
  const headers = baseHeaders();
  const token = sessionStorage.getItem("JWT");
  headers.append("Authorization", `bearer ${token}`);

  return headers;
};

type RequestInit = {
  method: string;
  headers: Headers;
  cache: RequestCache;
  body?: string;
};

const configureRequest = (
  method: string,
  headers: Headers,
  data?: {} // TODO: should probably be a generic
): RequestInit => {
  const config: RequestInit = {
    method,
    headers,
    cache: "default",
  };
  if (data) {
    config.body = JSON.stringify(data);
  }

  return config;
};

// TODO: create a base URL
export const createUserNote = (userId: number, note: string) => {
  const request = new Request(
    `${process.env.API_URL}/api/users/${userId}/notes`
  );
  const init = configureRequest("POST", defaultHeaders(), note);

  return fetch(request, init);
};

export const deleteNote = (noteId: number) => {
  const request = new Request(`${process.env.API_URL}/api/notes/${noteId}`);
  const init = configureRequest("DELETE", defaultHeaders());

  return fetch(request, init);
};

export const editNote = (noteId: number, note: string) => {
  const request = new Request(`${process.env.API_URL}/api/notes/${noteId}`);
  const init = configureRequest("PUT", defaultHeaders(), note);

  return fetch(request, init);
};

export const getUserNotes = (userId: number) => {
  const request = new Request(
    `${process.env.API_URL}/api/users/${userId}/notes`
  );
  const init = configureRequest("GET", defaultHeaders());

  return fetch(request, init);
};

export const login = (username: string, password: string) => {
  const request = new Request(
    `${process.env.API_URL}/api/login?username=${username}&password=${password}`
  );
  const init = configureRequest("POST", baseHeaders());

  return fetch(request, init);
};
