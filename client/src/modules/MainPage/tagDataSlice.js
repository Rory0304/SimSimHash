import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sample } from "../../assets/Sample";

const initialState = {
    tagList: [],
    selectedTagList: [],
    movieList: [],
    loading: false,
    error: ""
};

//15개씩 받아온다.
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
        { key: 9, name: "#거대한" },
        { key: 10, name: "#위대한" },
        { key: 11, name: "#절망적인" },
        { key: 12, name: "#비극적인" },
        { key: 13, name: "#광기의" },
        { key: 14, name: "#블랙코미디" },
        { key: 15, name: "#가족" }
    ];
    return requested;
});

//임시 테스트 용
export const getNewTagList = createAsyncThunk("GET_NEWTAG_DATA", (args, ThunkAPI) => {
    const requested = [
        { key: 1, name: "#재미있는" },
        { key: 2, name: "#독특한" },
        { key: 3, name: "#유쾌한" },
        { key: 4, name: "#감동적인" },
        { key: 7, name: "#웅장한" },
        { key: 5, name: "#의미있는" },
        { key: 6, name: "#재치있는" },
        { key: 8, name: "#멋있는" },
        { key: 9, name: "#거대한" },
        { key: 20, name: "#아름다운" },
        { key: 21, name: "#공포스러운" },
        { key: 22, name: "#희극의" },
        { key: 23, name: "무서운" },
        { key: 24, name: "인연" },
        { key: 25, name: "공포" }
    ];
    return requested;
});

export const getMovieListByTag = createAsyncThunk("GET_MOVIE_DATA", (args, ThunkAPI) => {
    //movie data 불러오는 곳 (debounce가 적용됨)
    console.log("debounce");
    const { mainTagDataSlice } = ThunkAPI.getState();
    const selectedTagNames = mainTagDataSlice.selectedTagList.map((item) => item.name);
    return sample.filter((movie) => selectedTagNames.includes(movie.total));
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
            Object.assign(state.tagList, action.payload.tagList);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMovieListByTag.rejected, (state, action) => {
            state.loading = false;
            state.movieList = [];
            state.error = action.payload;
        });

        builder.addCase(getMovieListByTag.pending, (state) => {
            state.loading = true;
            state.movieList = [];
            state.error = "";
        });
        builder.addCase(getMovieListByTag.fulfilled, (state, action) => {
            state.movieList = action.payload;
        });
    }
});

export const { addTag, removeTag, setTagList } = mainTagDataSlice.actions;
export default mainTagDataSlice.reducer;
