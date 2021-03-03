let apiDomain = "https://venxing.me/app/api/";;

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