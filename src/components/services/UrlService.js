
// if (process.env.NODE_ENV === "production") {
//   apiDomain = "https://calsmaitmei-server.venxing.me/api/";
// } else {
//   apiDomain = "http://calsmaitmei-app.test/api/";
// }

import axios from 'axios'

let apiDomain = "https://calsmaitmei-server.venxing.me/api/";

class UrlService {
  static setToken(token) {
    if (!token) return
    localStorage.setItem('access_token', token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }
  static loginUrl() {
    return apiDomain + "login";
  }
  static currentUserProfileUrl() {
    return apiDomain + "user";
  }
  static registerUrl() {
    return apiDomain + "register";
  }
  static forgotUrl() {
    return apiDomain + 'password/email';
  }
  static resetPasswordUrl() {
    return apiDomain + 'password/reset';
  }
  static handleRandomizer() {
    return apiDomain + 'randomizer/generate';
  }
  static SaveRandomizer() {
    return apiDomain + 'randomizer';
  }
  static SaveRandomizerList() {
    return apiDomain + 'randomizer';
  }
  static DeleteRandomizerList(id) {
    return apiDomain + 'randomizer/' + id;
  }
  static ExportUrl() {
    return apiDomain + 'export';
  }

}

export default UrlService;