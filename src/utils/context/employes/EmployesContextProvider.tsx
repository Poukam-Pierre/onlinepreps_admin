import { useReducer, Reducer, useContext } from "react";
import { employesDetails, EmployesDetails, State } from "./employes.interface";
import EmployesDetailsContext from "./employeContext";


const EmployesReducer: Reducer<EmployesDetails, employesDetails[]> = (
    state: State,
    payload: employesDetails[]
) => {
    return {
        ...state,
        employesDetails: {
            employesData: [...payload],
            isLoading: false
        }
    }
}

function EmployesDetailsContextProvider({
    children
}: {
    children: JSX.Element
}): JSX.Element {
    const initialState: EmployesDetails = {
        employesDetails: {
            employesData: [
                {
                    name: '',
                    poste: '',
                    total: 0,
                    testCategory: [],
                },
            ],
            isLoading: true,
        },
        employesDispatch: () => null,
    };

    const [employesDetailState, employesDispatch] = useReducer(
        EmployesReducer,
        initialState
    );

    const value = {
        employesDetails: employesDetailState.employesDetails,
        employesDispatch
    };
    return (
        <EmployesDetailsContext.Provider value={value}>
            {children}
        </EmployesDetailsContext.Provider>
    )
}

export default EmployesDetailsContextProvider

export const useEmployes = () => {
    const context = useContext(EmployesDetailsContext);
    if (!context) {
        throw new Error(
            'useEmployes must be used as a descendant of EmployesDetailsContext'
        );
    } else return context;
};

export const useEmployesDetails = () => {
    const context = useContext(EmployesDetailsContext);
    if (!context) {
        throw new Error(
            'useEmployesDetails must be used as a descendant of EmployesDetailsContext'
        );
    } else return context.employesDetails;
};
export const useEmployesDispatch = () => {
    const context = useContext(EmployesDetailsContext);
    if (!context) {
        throw new Error(
            'useEmployesDispatch must be used as a descendant of EmployesDetailsContext'
        );
    } else return context.employesDispatch;
};


