import { Reducer, useContext, useReducer } from "react";
import {
    PartnersDetails,
    partnersDetailsType,
    State
} from "./partner.interface";
import PartnersDetailsContext from "./partnerContext";


const PartnersReducer: Reducer<PartnersDetails, partnersDetailsType[]> = (
    state: State,
    payload: partnersDetailsType[]
) => {
    return { ...state, partnersDetails: [...payload] }
}

function PartnerDetailsContextProvider({
    children
}: {
    children: JSX.Element
}): JSX.Element {
    const initialState: PartnersDetails = {
        partnersDetails: [
            {
                name: '',
                uniqueId: '',
                total: 0,
                testCategory: [],
            },
        ],
        partnersDispatch: () => null,
    }

    const [partnersDetailState, partnersDispatch] = useReducer(
        PartnersReducer,
        initialState
    )

    const value = {
        partnersDetails: partnersDetailState.partnersDetails,
        partnersDispatch
    }
    return (
        <PartnersDetailsContext.Provider value={value}>
            {children}
        </PartnersDetailsContext.Provider>
    )
}

export default PartnerDetailsContextProvider

export const usePartner = () => {
    const context = useContext(PartnersDetailsContext);
    if (!context) {
        throw new Error(
            'usePartner must be used as a descendant of PartnersDetailsContext'
        );
    } else return context;
};

export const usePartnersDetails = () => {
    const context = useContext(PartnersDetailsContext);
    if (!context) {
        throw new Error(
            'usePartnerDetails must be used as a descendant of PartnersDetailsContext'
        );
    } else return context.partnersDetails;
};
export const usePartnersDispatch = () => {
    const context = useContext(PartnersDetailsContext);
    if (!context) {
        throw new Error(
            'usePartnerDispatch must be used as a descendant of PartnersDetailsContext'
        );
    } else return context.partnersDispatch;
};


