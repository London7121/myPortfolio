import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    pinfl: string | number;
    // roles: string[];
    role: string[];
    status: string;
    statusCode: number;
    username: string;
    image?: string;
    permissions: string[];
}

interface AuthState {
    expire: string | number;
    token: string;
    refreshToken: string;
    isAuth: boolean;
    userData?: UserData | null;
}

const initialState: AuthState = {
    expire: Number(sessionStorage.getItem("expire")) || 0,
    token: sessionStorage.getItem("token") ?? "",
    refreshToken: sessionStorage.getItem("refreshToken") ?? "",
    isAuth: !!sessionStorage.getItem("token"),
    userData: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setExpire: (state, action: PayloadAction<string | number>) => {
            const value = String(action.payload ?? '');
            state.expire = value;
            sessionStorage.setItem('expire', value);
        },
        setToken: (state, action: PayloadAction<string>) => {
            const value = action.payload ?? '';
            state.token = value;
            state.isAuth = !!value;
            sessionStorage.setItem('token', value);
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            const value = action.payload ?? '';
            state.refreshToken = value;
            sessionStorage.setItem('refreshToken', value);
        },
        setUserData: (state, action: PayloadAction<UserData>) => {
            state.userData = action.payload;
            sessionStorage.setItem("userData", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.token = "";
            state.refreshToken = "";
            state.isAuth = false;
            state.userData = null;
            state.expire = 0;
            sessionStorage.clear();
            localStorage.clear();
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('refreshToken');
            sessionStorage.removeItem('expire');
        }
    }
});

export const { setExpire, setToken, setRefreshToken, setUserData, logout } = authSlice.actions;
export default authSlice.reducer;