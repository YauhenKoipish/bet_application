export const getLanguage = () => {
  let language = window.navigator
    ? window.navigator.language ||
      window.navigator.systemLanguage ||
      window.navigator.userLanguage
    : "en";
  language = language.substr(0, 2).toLowerCase();
  return language;
};

export const getUrl = (url = "wss://wss.gldnsoft.com", lang = "en") => {
  switch (lang) {
    case "ru":
      return url + "/" + lang + "/";

    default:
      return url + "/" + lang + "/";
  }
};
