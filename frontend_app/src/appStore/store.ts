import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import drawElementsReducer from "@/appStore/reducers/drawElementsSlice";

export const store = configureStore({
    reducer: {
        elements: drawElementsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
