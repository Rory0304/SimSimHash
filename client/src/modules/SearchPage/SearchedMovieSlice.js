import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    matchedMovieList: [],
    title: "",
    page: 0,
    sort: "recent",
    N: 12,
    length: 0,
    loading: false,
    error: ""
};

/* [검색 페이지] 제목으로 검색된 영화 리스트를 불러옴 */
export const getMovieListByTitle = createAsyncThunk("GET_MOVIE_DATA_TITLE", async (args, ThunkAPI) => {
    const { searchedMovieSlice } = ThunkAPI.getState();
    try {
        const filteredMoviesTest = await axios.post("/api/search", {
            title: searchedMovieSlice.title,
            page: searchedMovieSlice.page,
            sort: searchedMovieSlice.sort,
            N: searchedMovieSlice.N
        });
        const entry = Object.entries(filteredMoviesTest.data);
        return entry;
    } catch (err) {
        console.log("제목과 관련된 영화 정보를 얻는데 실패했습니다", err);
        return [];
    }
});

export const searchedMovieSlice = createSlice({
    name: "searchedMovieSlice",
    initialState,
    reducers: {
        clearState(state, action) {
            state.matchedMovieList = [];
            state.page = 1;
            state.sort = "";
            state.error = "";
        },
        setTitle(state, action) {
            state.title = action.payload.keyword;
            console.log(state.title);
            console.log(state.matchedMovieList);
        },
        setPage(state, action) {
            state.page = action.payload.page;
            console.log(state.page);
            console.log(state.matchedMovieList);
        }, 
        setSort(state, action){
            state.sort = action.payload;
            console.log(state.sort);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMovieListByTitle.rejected, (state, action) => {
            state.loading = false;
            state.matchedMovieList = [];
            state.error = action.payload;
        });
        builder.addCase(getMovieListByTitle.pending, (state) => {
            state.loading = true;
            state.matchedMovieList = [];
            state.error = "";
        });
        builder.addCase(getMovieListByTitle.fulfilled, (state, action) => {
            state.matchedMovieList = action.payload;
            state.loading = false;
            state.error = "";
        });
    }
});

export const { clearState, setTitle, setPage, setSort } = searchedMovieSlice.actions;
export default searchedMovieSlice.reducer;
