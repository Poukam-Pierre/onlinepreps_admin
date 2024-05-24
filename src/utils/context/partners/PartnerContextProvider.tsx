import { Reducer, useContext, useReducer } from "react";
import {
    partnersDetails,
    PartnersDetails,
    partnersDetailsType,
    State
} from "./partner.interface";
import PartnersDetailsContext from "./partnerContext";


const PartnersReducer: Reducer<PartnersDetails, partnersDetails[]> = (
    state: State,
    payload: partnersDetails[]
) => {
    return {
        ...state,
        partnersDetails: {
            partnersData: [...payload],
            isLoading: false
        }
    }
}

function PartnerDetailsContextProvider({
    children
}: {
    children: JSX.Element
}): JSX.Element {
    const initialState: PartnersDetails = {
        partnersDetails: {
            partnersData: [
                {
                    name: '',
                    uniqueId: '',
                    total: 0,
                    testCategory: [],
                },
            ],
            isLoading: true,
        },
        partnersDispatch: () => null,
    };

    const [partnersDetailState, partnersDispatch] = useReducer(
        PartnersReducer,
        initialState
    );

    const value = {
        partnersDetails: partnersDetailState.partnersDetails,
        partnersDispatch
    };
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


