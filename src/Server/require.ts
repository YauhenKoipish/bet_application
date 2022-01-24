import { getInfoXhrReqire } from "./";
export const getDictionary = (lang, callback) => {
    getInfoXhrReqire(`/${lang}.json`, "GET").then(
        response => {
            if (callback) callback(lang, JSON.parse(response));
            // debugger;
            const dictionary = JSON.parse(response);

            return { status: 200, dictionary };
        },
        error => {
            console.log(
                `Rejected: ${error} ---- СЛОВАРЬ НЕ ПОЛУЧЕН ЯЗЫК ${lang}`
            );
            if (callback) callback(lang, null);
            else return { status: 500 };
        }
    );
};
