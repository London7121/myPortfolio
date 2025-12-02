// selectors.ts

import type { RootState } from "./store";

export const selectToken = (state: RootState) => state.auth.token;
export const selectUserData = (state: RootState) => state.auth.userData;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;