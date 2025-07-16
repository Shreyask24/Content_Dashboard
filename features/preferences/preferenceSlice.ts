import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
    categories: string[];
}

const initialState: PreferencesState = {
    categories: typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("categories") || '["technology"]')
        : ["technology"],
};

const preferencesSlice = createSlice({
    name: "preferences",
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<string[]>) {
            state.categories = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem("categories", JSON.stringify(action.payload));
            }
        },
    },
});

export const { setCategories } = preferencesSlice.actions;
export default preferencesSlice.reducer;
