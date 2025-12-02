import { createSlice } from "@reduxjs/toolkit";

interface UIState {
    collapsed: boolean;
}

const initialState: UIState = {
    collapsed: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.collapsed = !state.collapsed;
        },
        setCollapsed(state, action) {
            state.collapsed = action.payload;
        }
    }
});

export const { toggleSidebar, setCollapsed } = uiSlice.actions;
export default uiSlice.reducer;