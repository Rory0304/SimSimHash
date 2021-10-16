import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    movie_id: "",
    movieInfo: {
        detail: {
            title: "",
            release_date: "",
            actor: "",
            director: "",
            summary: "",
            running_time: 0,
            poster: "",
            genre: "",
            rating: ""
        },
        total: {
            score: 0,
            tags: {}
        },
        platform_summary: {
            naver: 0.0,
            daum: 0.0,
            watcha: 0.0,
            cine21: 0.0,
            naver_count: 0,
            daum_count: 0,
            watcha_count: 0,
            cine21_count: 0,
            naver_tag: ["", "", "", "", ""],
            daum_tag: ["", "", "", "", ""],
            watcha_tag: ["", "", "", "", ""],
            cine21_tag: ["", "", "", "", ""]
        }
    },
    loading: false,
    error: ""
};

export const getMovieInfo = createAsyncThunk("GET_MOVIE_INFO", async (args, ThunkAPI) => {
    /* 백엔드 [GET] /detail/<movie_id> 요청 */
    try {
        let response = await axios.get("/api/detail/get_detail", {
            params: {
                movie_id: args.id
            }
        });
        console.log(response.data);
        return { data: response.data, movie_id: args.id };
    } catch (err) {
        console.log("default 영화 데이터를 얻어오는데 실패했습니다.", err);
        return [];
    }
});

export const movieInfoSlice = createSlice({
    name: "movieInfoSlice",
    initialState,
    reducers: {
        clearMovieInfo(state, action) {
            state.movie_id = "";
            state.movieInfo = {
                detail: {
                    title: "",
                    release_date: "",
                    actor: "",
                    director: "",
                    summary: "",
                    running_time: 0,
                    poster: "",
                    genre: "",
                    rating: ""
                },
                total: {
                    score: 0,
                    tags: {}
                },
                platform_summary: {
                    naver: 0.0,
                    daum: 0.0,
                    watcha: 0.0,
                    cine21: 0.0,
                    naver_count: 0,
                    daum_count: 0,
                    watcha_count: 0,
                    cine21_count: 0,
                    naver_tag: ["", "", "", "", ""],
                    daum_tag: ["", "", "", "", ""],
                    watcha_tag: ["", "", "", "", ""],
                    cine21_tag: ["", "", "", "", ""]
                }
            };
            state.loading = false;
            state.error = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMovieInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(getMovieInfo.pending, (state) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(getMovieInfo.fulfilled, (state, action) => {
            state.movie_id = action.payload.movie_id;
            state.movieInfo = action.payload.data;
            state.loading = false;
            state.error = "";
        });
    }
});

export const { clearMovieInfo } = movieInfoSlice.actions;
export default movieInfoSlice.reducer;
