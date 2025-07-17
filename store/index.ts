import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../features/content/newSlice";
import socialReducer from "../features/content/socialSlice";
import preferencesReducer from "../features/preferences/preferenceSlice";
import searchReducer from "../features/search/searchSlice";

const store = configureStore({
    reducer: {
        news: newsReducer,
        social: socialReducer,
        preferences: preferencesReducer,
        search: searchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
