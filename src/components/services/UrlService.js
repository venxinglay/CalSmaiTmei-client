
// if (process.env.NODE_ENV === "production") {
//   apiDomain = "https://calsmaitmei-server.venxing.me/api/";
// } else {
//   apiDomain = "http://calsmaitmei-app.test/api/";
// }

// let apiDomain = "https://calsmaitmei-server.venxing.me/api/";
 let apiDomain = "http://calsmaitmei-app.test/api/";
class UrlService {
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