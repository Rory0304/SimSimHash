import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sample } from "../../assets/Sample";

const initialState = {
    tagList: [],
    selectedTagList: [],
    initialMovieList: [],
    movieList: [],
    loading: false,
    tagLoading: false,
    error: ""
};

//[메인페이지] 15개씩 랜덤 태그를 받아온다.
export const getRandomTagList = createAsyncThunk("GET_TAG_DATA", async (args, ThunkAPI) => {
    try {
        let requestedTags = await axios.get("/api/tag");
        return requestedTags.data;
    } catch (err) {
        return [];
    }
});

/* [메인 페이지] 처음 보여줄 영화 목록 슬라이드 */
export const getInitialMovieList = createAsyncThunk(
    "GET_INITIAL_MOVIE_DATA",
    async (args, ThunkAPI) => {
        try {
            let response = await axios.get("/api/movie");
            const entry = Object.entries(response.data);
            return entry;
        } catch (err) {
            return [];
        }
    }
);

/* [메인 페이지] 태그와 관련된 영화 리스트를 불러옴 */
export const getMovieListByTag = createAsyncThunk("GET_MOVIE_DATA", async (args, ThunkAPI) => {
    const { mainTagDataSlice } = ThunkAPI.getState();
    try {
        if (mainTagDataSlice.selectedTagList.length === 0) {
            return mainTagDataSlice.initialMovieList;
        } else {
            const convertedJson = { ...mainTagDataSlice.selectedTagList };
            const response = await axios.post("/api/searchtag", {
                page: 0,
                sort: "",
                N: 50,
                tags: convertedJson
            });
            const entry = Object.entries(response.data.content);
            return entry;
        }
    } catch (err) {
        return [];
    }
});

export const mainTagDataSlice = createSlice({
    name: "mainTagDataSlice",
    initialState,
    reducers: {
        clearTag(state, aciton) {
            state.loading = false;
            state.tagLoading = false;
            state.tagList = [];
            state.selectedTagList = [];
            state.error = "";
        },
        addTag(state, action) {
            //action.payload.tag: 선택한 태그 이름
            state.selectedTagList.push(action.payload.tag);
        },
        removeTag(state, action) {
            //acton.payload.selectedTag: 제거할 태그 이름
            const filteredTagList = state.selectedTagList.filter(
                (item) => item !== action.payload.selectedTag
            );
            state.selectedTagList = filteredTagList;
        },
        setTagList(state, action) {
            Object.assign(state.tagList, action.payload.tagList);
        }
    },
    extraReducers: (builder) => {
        /* default 메인 페이지 슬라이드 영화 정보를 보여주는 함수 상태 */
        builder.addCase(getInitialMovieList.rejected, (state, action) => {
            state.loading = false;
            state.initialMovieList = [];
            state.movieList = [];
            state.error = action.payload;
        });
        builder.addCase(getInitialMovieList.pending, (state, action) => {
            state.loading = true;
            state.initialMovieList = [];
            state.movieList = [];
            state.error = "";
        });
        builder.addCase(getInitialMovieList.fulfilled, (state, action) => {
            state.initialMovieList = action.payload;
            state.movieList = action.payload;
            state.loading = false;
            state.error = "";
        });
        /* 랜덤 태그를 받아오는 함수 상태 */
        builder.addCase(getRandomTagList.rejected, (state, action) => {
            state.tagLoading = false;
            state.tagList = [];
            state.error = action.payload;
        });
        builder.addCase(getRandomTagList.pending, (state, action) => {
            state.tagLoading = true;
            state.tagList = [];
            state.error = "";
        });
        builder.addCase(getRandomTagList.fulfilled, (state, action) => {
            state.tagList = action.payload;
            state.tagLoading = false;
            state.error = "";
        });
        /* 태그와 관련된 영화 리스트를 받아오는 함수 상태 */
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
            state.loading = false;
            state.error = "";
        });
    }
});

export const { addTag, removeTag, setTagList, clearTag } = mainTagDataSlice.actions;
export default mainTagDataSlice.reducer;
