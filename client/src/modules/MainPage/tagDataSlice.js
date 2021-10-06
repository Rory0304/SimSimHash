import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    tagList: [],
    selectedTagList: [],
    movieList: []
};

export const getTagList = createAsyncThunk("GET_TAG_DATA", (args, ThunkAPI) => {
    const requested = [
        { key: 1, name: "#재미있는" },
        { key: 2, name: "#독특한" },
        { key: 3, name: "#유쾌한" },
        { key: 4, name: "#감동적인" },
        { key: 5, name: "#의미있는" },
        { key: 6, name: "#재치있는" },
        { key: 7, name: "#웅장한" },
        { key: 8, name: "#멋있는" },
        { key: 9, name: "#거대한" }
    ];
    return requested;
});

//임시 테스트 용
export const getNewTagList = createAsyncThunk("GET_NEWTAG_DATA", (args, ThunkAPI) => {
    const requested = [
        { key: 10, name: "#재미있는" },
        { key: 2, name: "#독특한" },
        { key: 12, name: "#유쾌한" },
        { key: 4, name: "#감동적인" },
        { key: 14, name: "#의미있는" },
        { key: 15, name: "#재치있는" },
        { key: 7, name: "#웅장한" },
        { key: 17, name: "#멋있는" },
        { key: 18, name: "#거대한" }
    ];
    return requested;
});

export const getMovieListByTag = createAsyncThunk("GET_MOVIE_DATA", (args, ThunkAPI) => {
    //movie data 불러오는 곳 (debounce가 적용됨)
    console.log("movie data");
});

export const mainTagDataSlice = createSlice({
    name: "mainTagDataSlice",
    initialState,
    reducers: {
        addTag(state, action) {
            state.selectedTagList.push(action.payload.tag);
        },
        removeTag(state, action) {
            const filteredTagList = state.selectedTagList.filter(
                (item) => item.key !== action.payload.tagIndex
            );
            state.selectedTagList = filteredTagList;
        },
        setTagList(state, action) {
            state.tagList = action.payload.tagList;
        }
    }
});

export const { addTag, removeTag, setTagList } = mainTagDataSlice.actions;
export default mainTagDataSlice.reducer;
