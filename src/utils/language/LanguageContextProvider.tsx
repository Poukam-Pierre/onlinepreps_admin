import { Reducer, useContext, useReducer } from "react";
import { Action, Language, LanguageInfos, LanguageType, State } from "./language.interface";
import i18next from "i18next";
import LanguageContext from "./languageContext";

export const supportedLanguages: LanguageType[] = ['en', 'fr']


export const supportedLanguageFrenshVersionInfos: LanguageInfos[] = [
    {
        code: 'fr',
        label: 'Français',
        country_code: 'fr',
    },
    {
        code: 'en',
        label: 'Anglais',
        country_code: 'gb',
    },

]
export const supportedLanguageEnglishVersionInfos: LanguageInfos[] = [
    {
        code: 'fr',
        label: 'Frensh',
        country_code: 'fr',
    },
    {
        code: 'en',
        label: 'English',
        country_code: 'gb',
    },

]
const languageReducer: Reducer<Language, Action> = (
    state: State,
    action: Action
) => {
    switch (action.type) {
        case 'USE_ENGLISH': {
            i18next.changeLanguage('en');
            return { ...state, activeLanguage: localStorage.getItem('i18nextLng') as string }
        }
        case 'USE_FRENSH': {
            i18next.changeLanguage('fr');
            return { ...state, activeLanguage: localStorage.getItem('i18nextLng') as string }
        }
        default:
            return state;
    }
};


function LanguageContextProvider({
    children,
}: {
    children: JSX.Element;
}): JSX.Element {
    const defaultLang: LanguageType = localStorage.getItem('i18nextLng') as string
    const initialState: Language = {
        activeLanguage: defaultLang ?? 'en',
        languageDispatch: () => null,
    }

    const [languageState, languageDispatch] = useReducer(
        languageReducer,
        initialState,
    )

    const value = {
        activeLanguage: languageState.activeLanguage,
        languageDispatch,
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageContextProvider;

export const useOPLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error(
            'useOPLanguage must be used as a descendant of LanguageProvider'
        );
    } else return context;
};

export const useActiveLanguages = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error(
            'useOPLanguage must be used as a descendant of LanguageProvider'
        );
    } else return context.activeLanguage;
}

export const useDispatchLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error(
            'useOPLanguage must be used as a descendant of LanguageProvider'
        );
    } else return context.languageDispatch;

}