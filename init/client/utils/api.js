/**
 * Fetch data from rest API.
 */
import "isomorphic-fetch";

const api = {
  BASE_URL: "",

  // Statefully set the base port and host (for server-side).
  setBaseUrl: (host, port) => {
    if (host) {
      api.BASE_URL = `http://${host}`;
      if (port) {
        api.BASE_URL = `${api.BASE_URL}:${port}`;
      }
    }
  },

  fetchBase: () =>
    fetch(`${api.BASE_URL}/api/base`)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("Bad server response");
        }
        return res.json();
      })
      .then((data) => data)
};

export default api;
