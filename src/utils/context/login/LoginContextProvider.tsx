import { authAuthentication, Authentication, authInterface, StateLogin } from "./login.interface";
import { Reducer, useContext, useReducer } from "react"
import AuthContext from "./loginContext";


const authReducer: Reducer<Authentication, authAuthentication> = (
    state: StateLogin,
    payload: authAuthentication
) => {
    localStorage.setItem('auth', JSON.stringify(
        {
            ...state,
            userData: {
                authData: { ...payload },
                isLoading: false
            }
        }
    )
    )
    return {
        ...state,
        userData: {
            authData: { ...payload },
            isLoading: false,
        }
    }
}

const authStatus = localStorage.getItem('auth')
function AuthContextProvider({
    children,
}: {
    children: JSX.Element;
}): JSX.Element {
    const initialState: Authentication = {
        userData: authStatus ?
            (JSON.parse(authStatus.toString()) as authInterface)
            :
            {
                authData: {
                    accessToken: '',
                    userInfo: {
                        id: undefined,
                        nom: '',
                        prenom: '',
                        email: '',
                    },
                },
                isLoading: true,
            },
        authDispatch: () => null
    };

    const [authState, authDispatch] = useReducer(authReducer, initialState);
    const value = { ...authState, authDispatch };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used as a descendant of AuthProvider');
    } else return context;
};

export const useUserData = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useUserData must be used as a descendant of AuthProvider');
    } else return context.userData;
};

export const useAuthDispatch = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used as a descendant of AuthProvider')
    } else return context.authDispatch;
};


