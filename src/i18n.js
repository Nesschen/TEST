import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-xhr-backend";
import { reactI18nextModule } from "react-i18next";

i18n
    .use(detector)
    .use(backend)
    .use(reactI18nextModule) // passes i18n down to react-i18next
    .init({
        fallbackLng: "en", // use en if detected lng is not available

        interpolation: {
            escapeValue: false // react already safes from xss
        },

        // react-i18next options
        react: {
            wait: false
        }
    });

export default i18n;
