const baseHeaders = () => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  return myHeaders;
};

const defaultHeaders = () => {
  const headers = baseHeaders();
  const token = sessionStorage.getItem("JWT");
  headers.append("Authorization", `bearer ${token}`);

  return headers;
};

const configureRequest = (method, headers, data) => {
  const config = {
    method,
    headers,
    cache: "default"
  };
  if (data) {
    config.body = JSON.stringify(data);
  }

  return config;
};

// TODO: create a base URL
export const createUserNote = (userId, note) => {
  const request = new Request(
    `http://localhost:3000/api/users/${userId}/notes`
  );
  const init = configureRequest("POST", defaultHeaders(), note);

  return fetch(request, init);
};

export const deleteNote = noteId => {
  const request = new Request(`http://localhost:3000/api/notes/${noteId}`);
  const init = configureRequest("DELETE", defaultHeaders());

  return fetch(request, init);
};

export const getUserNotes = userId => {
  const request = new Request(
    `http://localhost:3000/api/users/${userId}/notes`
  );
  const init = configureRequest("GET", defaultHeaders());

  return fetch(request, init);
};

export const login = (username, password) => {
  const request = new Request(
    `http://localhost:3000/api/login?username=${username}&password=${password}`
  );
  const init = configureRequest("POST", baseHeaders());

  return fetch(request, init);
};
