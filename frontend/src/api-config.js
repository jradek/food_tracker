// See also: https://daveceddia.com/multiple-environments-with-react/

const apiVersion = "v1";

// const hostname = window && window.location && window.location.hostname;
const backendHost = "http://localhost:5000";

export const API_ROOT = `${backendHost}/api/${apiVersion}`;
