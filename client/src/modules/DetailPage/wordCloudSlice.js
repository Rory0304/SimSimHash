import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    movie_id: "",
    selectedPlatform: "",
    hashtags: {
        naver: [],
        watcha: [],
        daum: [],
        cine21: []
    },
    words: {
        naver: [],
        watcha: [],
        daum: [],
        cine21: []
    },
    loading: "",
    error: ""
};

/* 플랫폼 별 워드 클라우드 데이터 요청 */
export const getPlatformWord = createAsyncThunk("GET_PLATFORM_WORD", async (args, ThunkAPI) => {
    /* 백엔드 [GET] /detail/<movie_id> 요청 */
    try {
        let response = await axios.post("/api/detail/get_platform", {
            movie_id: args.movie_id,
            platform: args.platform
        });
        return response.data;
    } catch (err) {
        return [];
    }
});

export const wordCloudSlice = createSlice({
    name: "wordCloudSlice",
    initialState,
    reducers: {
        clearPlatformData(state, action) {
            state.movie_id = "";
            state.words = {
                naver: [],
                watcha: [],
                daum: [],
                cine21: []
            };
            state.hashtags = {
                naver: [],
                watcha: [],
                daum: [],
                cine21: []
            };
            state.selectedPlatform = "";
        },
        setPlatformName(state, action) {
            //action.payload: 선택한 플랫폼 영어 이름
            state.selectedPlatform = action.payload.name;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPlatformWord.rejected, (state, action) => {
            state.loading = false;
            state.words[state.selectedPlatform] = [];
            state.error = action.payload;
        });

        builder.addCase(getPlatformWord.pending, (state) => {
            state.loading = true;
            state.words[state.selectedPlatform] = [];
            state.error = "";
        });

        builder.addCase(getPlatformWord.fulfilled, (state, action) => {
            const wordList = Object.keys(action.payload).map((wordText) => ({
                text: wordText,
                value: action.payload[wordText]
            }));
            state.words[state.selectedPlatform] = wordList;
            state.loading = false;
            state.error = "";
        });
    }
});

export const { clearPlatformData, setPlatformName } = wordCloudSlice.actions;
export default wordCloudSlice.reducer;
