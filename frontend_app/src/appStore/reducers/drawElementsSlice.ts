import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from "@reduxjs/toolkit";
import { makeRequest } from '@/utils/requestUtil';
import { RootState } from "@/appStore/store";
import {
    SvgType,
    SvgInjectType
} from '@/types';

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

export type FeatureModeType = FeatureModes.default | FeatureModes.addElement | FeatureModes.deleteElement;

interface GenericChangeDataType { // TODO: refactor that !!!
    [key: string]: string | number;
};

interface initialStateType {
    elements: SvgType[];
    featureMode: FeatureModeType;
    currentColor: string;
    status: Status.idle | Status.loading | Status.succeeded | Status.failed;
    error: string | null;
};
const initialState: initialStateType = {
    elements: [],
    featureMode: FeatureModes.default,
    currentColor: defaultCurrentColor,
    status: Status.idle,
    error: null
};

/*
    We load elements data from the server
*/
export const fetchElements = createAsyncThunk('elements/fetchElements', async () => {
    const graphQuery = `
        query AllElements {
            listElements {
                success
                errors
                elements {
                    id
                    width
                    height
                    x
                    y
                    color
                }
            }
        }
    `;
    const elementsData = await makeRequest({
        url: '',
        params: {
            query: graphQuery
        },
        method: 'POST'
    });
    return elementsData;
});

/*
    Add element
*/
export const addElement = createAsyncThunk('elements/addElement', async (element: SvgInjectType) => {
    const {
        width,
        height,
        x,
        y,
        color
    } = element;
    const graphQuery = `
        mutation CreateNewElement {
            createElement(
                width: ${width}, 
                height: ${height},
                x: ${x},
                y: ${y},
                color: "${color}"
            ) {
                element {
                    id
                    width
                    height
                    x
                    y
                    color
                }
                success
                errors
            }
        }
    `;
    const elementData = await makeRequest({
        url: '',
        params: {
            query: graphQuery
        },
        method: 'POST'
    });
    console.log('elementData: ', elementData);
    return elementData;
});

/*
    Delete element
*/
export const deleteElement = createAsyncThunk('elements/deleteElement', async (id: string) => {
    const graphQuery = `
        mutation DeleteElement {
            deleteElement(id="${id}") {
                element {
                    id
                    width
                    height
                    x
                    y
                    color
                }
                success
                errors
            }
        }
    `;
    const elementData = await makeRequest({
        url: '',
        params: {
            query: graphQuery
        },
        method: 'POST'
    });
    return elementData;
});

/*
    Slice definition
*/
export const drawElementsSlice = createSlice({
    name: "elements",
    initialState,
    reducers: {
        addElementTmp: (state, action: PayloadAction<SvgType>) => {
            const svgElement = action.payload;
            state.elements.push(svgElement);
        },
        deleteElementTmp: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const key = state.elements.findIndex(e => e.id === id);
            if (key > -1) {
                state.elements.splice(key, 1);
            }
        },
        clearElementsTmp: (state) => {
            state.elements = [];
        },
        genericChangeData: (state, action: PayloadAction<GenericChangeDataType>) => {
            const data = action.payload;
            for (let key in data) {
                // @ts-ignore
                state[key] = data[key];
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchElements.pending, (state) => {
                state.status = Status.loading;
            })
            .addCase(fetchElements.fulfilled, (state, action: PayloadAction<SvgType[]>) => {
                state.status = Status.succeeded;
                const elements = action.payload;
                state.elements = elements;
            })
            .addCase(fetchElements.rejected, (state) => {
                state.status = Status.failed;
                state.error = 'api error';
            })
            .addCase(addElement.fulfilled, (state, action: PayloadAction<SvgType>) => {
                const svgElement = action.payload;
                state.elements.push(svgElement);
            })
            .addCase(deleteElement.fulfilled, (state, action: PayloadAction<SvgType>) => {
                const { id } = action.payload;
                const key = state.elements.findIndex(e => e.id === id);
                if (key > -1) {
                    state.elements.splice(key, 1);
                }
            })
    }
});

export const {
    addElementTmp,
    deleteElementTmp,
    clearElementsTmp,
    genericChangeData,
} = drawElementsSlice.actions;

export const selectData = (state: RootState) => state.elements;

export default drawElementsSlice.reducer;
