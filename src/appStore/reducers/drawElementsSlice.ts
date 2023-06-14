import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from "@reduxjs/toolkit";
import { makeRequest } from '@/utils/requestUtil';
import { RootState } from "@/appStore/store";

export enum Status {
    idle = 'idle',
    loading = 'loading',
    succeeded = 'succeeded',
    failed = 'failed'
};

export enum FeatureModes {
    default,
    addElement,
    deleteElement
};

export const defaultCurrentColor = '#ccc';

interface ElementType {
    element: string;
};
interface initialStateType {
    elements: ElementType[];
    featureMode: number;
    currentColor: string;
    status: Status.idle | Status.loading | Status.succeeded | Status.failed;
    error: string | null;
};
const initialState: initialStateType = {
    elements: [],
    featureMode: FeatureModes.default | FeatureModes.addElement | FeatureModes.deleteElement,
    currentColor: defaultCurrentColor,
    status: Status.idle,
    error: null
};

/*
    We load elements data from the server
*/
export const fetchElements = createAsyncThunk('elements/fetchElements', async () => {
    const elementsData = await makeRequest({
        url: '/elements'
    });
    return elementsData;
});

/*
    Slice definition
*/
export const drawElementsSlice = createSlice({
    name: "elements",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchElements.pending, (state) => {
                state.status = Status.loading;
            })
            .addCase(fetchElements.fulfilled, (state, action: PayloadAction<ElementType[]>) => {
                state.status = Status.succeeded;
                const elements = action.payload;
                state.elements = elements;
            })
            .addCase(fetchElements.rejected, (state) => {
                state.status = Status.failed;
                state.error = 'api error';
            })
    }
});

export const selectData = (state: RootState) => state.elements;

export default drawElementsSlice.reducer;
