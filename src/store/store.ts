import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import  authSlice  from "../store/auth/authSlice";
import  uiSlice  from "../store/uiSlice";
import { errorMiddleware } from "../service/middleware/errorMiddleware";
import { api } from "../service/api";

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authSlice,
    ui: uiSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(api.middleware, errorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <T>(selector: (state: RootState) => T) => T = useSelector;