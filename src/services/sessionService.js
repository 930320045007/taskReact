import jwtDecode from "jwt-decode";
import http from "./httpService";
// import { apiUrl } from "../config.json";
const apiUrl = process.env.REACT_APP_HOST;

const verifyToken = () => {
  const { username, worksite, token } = JSON.parse(getSession());
  return new Promise((resolve, reject) => {
    http
      .post(
        `${apiUrl}/user/verify`,
        { username: username },
        { worksite: worksite },
        { headers: { "x-auth-token": token } }
      )
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const setSession = ({ auth, token: session }) => {
  if (auth === true) {
    sessionStorage.setItem("session", session);
    localStorage.setItem("session", session);
  }
  return session;
};

const getSession = () =>
  sessionStorage.getItem("session") || localStorage.getItem("session");

const extractSession = (session) => {
  const { _id, aud, exp, iat, iss, sub, ...rest } = jwtDecode(session);
  return { ...rest };
};

const setLocal = () => localStorage.setItem("sessionData", this.getSession());

const getToken = () => {
  const { token } = JSON.parse(
    sessionStorage.getItem("sessionData") || localStorage.getItem("sessionData")
  );
  return token;
};

const authenticate = (data) => {
  return new Promise((resolve, reject) => {
    http
      // .post(`${apiUrl}/user/authenticate`, data)
      .post(`${apiUrl}/user/authenticateTemp`, data)
      .then(({ data }) => {
        const session = setSession(data);
        // const sessionData = extractSession(session);
        // console.log(sessionData);
        resolve(data);
      })
      .catch((err) => {
        console.log(err.message);
        reject(err);
      });
  });
};

const verifySession = (username, token) => {
  return new Promise((resolve, reject) => {
    http
      .post(
        `${apiUrl}/user/verify`,
        { username: username },
        { headers: { "x-auth-token": token } }
      )
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const signout = () => {
  sessionStorage.removeItem("sessionData");
  localStorage.removeItem("sessionData");
};

const sessionService = {
  isAuthenticated: false,
  persistence: "false",
  username: "",
  token: "",
  authenticate,
  verifyToken,
  verifySession,
  getSession,
  extractSession,
  setLocal,
  getToken,
  signout,
};

export {
  authenticate,
  setSession,
  verifyToken,
  verifySession,
  getSession,
  extractSession,
  setLocal,
  getToken,
  signout,
};
export default sessionService;
