import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../features/content/newSlice";
import socialReducer from "../features/content/socialSlice";
import preferencesReducer from "../features/preferences/preferenceSlice";

const store = configureStore({
    reducer: {
        news: newsReducer,
        social: socialReducer,
        preferences: preferencesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
