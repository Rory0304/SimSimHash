import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    defaultMovieList: [],
    currentMovieList: [],
    offset: 0,
    limit: 8,
    loading: false,
    error: ""
};

//[작품 검색] 처음 화면에 보여줄 영화 24개를 요청한다.
export const getMovieList = createAsyncThunk("GET_MOVIE_LIST", async (args, ThunkAPI) => {
    try {
        let response = await axios.get("/api/movie");
        console.log("deafault 영화 데이터를 성공적으로 불러왔습니다.", response.data);
        const entry = Object.entries(response.data);
        return entry;
    } catch (err) {
        console.log("default 영화 데이터를 얻어오는데 실패했습니다.", err);
        return [];
    }
});

export const DefaultMovieSlice = createSlice({
    name: "defaultMovieSlice",
    initialState,
    reducers: {
        clearState(state, action) {
            state.defaultMovieList = [];
            state.currentMovieList = [];
            state.offset = 0;
            state.error = "";
        },
        addMovie(state, action) {
            if (state.offset < state.defaultMovieList.length) {
                const slicedMovieList = state.defaultMovieList.slice(
                    state.offset,
                    state.offset + state.limit
                );
                state.offset = state.offset + state.limit;
                state.currentMovieList = state.currentMovieList.concat(slicedMovieList);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMovieList.rejected, (state, action) => {
            state.loading = false;
            state.defaultMovieList = [];
            state.error = action.payload;
        });

        builder.addCase(getMovieList.pending, (state) => {
            state.loading = true;
            state.defaultMovieList = [];
            state.error = "";
        });
        builder.addCase(getMovieList.fulfilled, (state, action) => {
            state.defaultMovieList = action.payload;
            state.currentMovieList = action.payload.slice(0, state.limit);
            state.offset = state.offset + state.limit;
            state.loading = false;
            state.error = "";
        });
    }
});

export const { clearState, addMovie } = DefaultMovieSlice.actions;
export default DefaultMovieSlice.reducer;
