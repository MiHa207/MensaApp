import i18next from "i18next";
import english from "./english.json";
import german from "./german.json";
import {initReactI18Next} from "react-i18next";



i18next.init({
    lng:"de",
    resources:{
        de: german,
        en: english
    },
    react:{
        useSuspense:false,

    },
});
export default i18next;