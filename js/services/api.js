const defaultHeaders = () => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  const token = sessionStorage.getItem("JWT");
  myHeaders.append("Authorization", `bearer ${token}`);
  return myHeaders;
};

const configureRequest = (method, headers, body) => {
  const config = {
    method,
    headers,
    cache: "default"
  };
  if (body) {
    config.body = body;
  }

  console.log('config', config);
  return config;
};

// TODO: this endpoint should be updated to get the current user from the token
// TODO: create a base URL
export const getUserNotes = userId => {
  const request = new Request(
    `http://localhost:3000/api/users/${userId}/notes`
  );
  const init = configureRequest("GET", defaultHeaders());

  return fetch(request, init);
};

// TOOD: try to use request body
export const login = (username, password) => {
  const request = new Request(
    `http://localhost:3000/api/login?username=${username}&password=${password}`
  );
  // const body = { username, password };
  // const init = configureRequest("POST", defaultHeaders(), JSON.stringify(body));
  const init = configureRequest("POST", defaultHeaders());
  console.log("init", init);

  return fetch(request, init);
};
