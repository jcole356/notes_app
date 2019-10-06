const defaultHeaders = () => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  const token = sessionStorage.getItem("JWT");
  myHeaders.append("Authorization", `bearer ${token}`);
  return myHeaders;
};

const configureRequest = (method, headers) => {
  return {
    method,
    headers,
    cache: "default"
  };
};

// TODO: once you add a second one here, should be fine
// eslint-disable-next-line import/prefer-default-export
export const getUserNotes = userId => {
  const request = new Request(
    `http://localhost:3000/api/users/${userId}/notes`
  );
  const init = configureRequest("GET", defaultHeaders());
  return fetch(request, init);
};
