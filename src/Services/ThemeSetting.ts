import { varibleCss } from "../Constants";

export const changeTheme = (nameTheme: string, propsSetting) => {
    for (let key in varibleCss) {
        if (varibleCss.hasOwnProperty(key)) {
            document.documentElement.style.setProperty(
                key,
                propsSetting.theme[nameTheme][varibleCss[key]]
            );
        }
    }
};
