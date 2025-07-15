import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import contentReducer from "@/features/content/contentSlice";
import spotifyReducer from "@/features/content/spotifySlice";

const rootReducer = combineReducers({
    content: contentReducer,
    spotify: spotifyReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["preferences", "favorites"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
