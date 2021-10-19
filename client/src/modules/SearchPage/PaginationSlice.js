import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0
};

export const PaginationSlice = createSlice({
    name: "PaginationSlice",
    initialState,
    reducers: {
        clearState(state, action) {
            state.totalPage = 0;
            state.current = 1;
            state.minIndex = 0;
            state.maxIndex = 11;
        },
        setPagination(state, action) {
            state.totalPage = action.payload.totalPage;
            state.current = action.payload.current;
            state.minIndex = action.payload.minIndex;
            state.maxIndex = action.payload.maxIndex;
        }
    }
});

export const { clearState, setPagination } = PaginationSlice.actions;
export default PaginationSlice.reducer;
