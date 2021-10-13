import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sample } from "../../assets/Sample";

const initialState = {
    tagList: [],
    selectedTagList: [],
    movieList: [],
    loading: false,
    error: ""
};

//[메인페이지] 15개씩 랜덤 태그를 받아온다.
export const getRandomTagList = createAsyncThunk("GET_TAG_DATA", async (args, ThunkAPI) => {
    let result = [
        "재미있는",
        "독특한",
        "유쾌한",
        "감동적인",
        "의미있는",
        "재치있는",
        "웅장한",
        "멋있는",
        "거대한",
        "위대한",
        "절망적인",
        "비극적인"
    ];
    try {
        let requestedTags = await axios.get("/api/tag");
        //현재 백엔드에서 3개씩 태그를 보내주기 때문에, sample tag 12개에 합친다.
        requestedTags = requestedTags.data.map((tag) => tag.trim());
        result = result.concat(requestedTags);
        return result;
    } catch (err) {
        console.log("태그 요청에 실패했습니다.", err);
        return [];
    }
});

/* [메인 페이지] 태그와 관련된 영화 리스트를 불러옴 */
export const getMovieListByTag = createAsyncThunk("GET_MOVIE_DATA", (args, ThunkAPI) => {
    const { mainTagDataSlice } = ThunkAPI.getState();
    const filteredMovies = sample.filter((movie) =>
        mainTagDataSlice.selectedTagList.includes(movie.total)
    );
    return filteredMovies;
});

export const mainTagDataSlice = createSlice({
    name: "mainTagDataSlice",
    initialState,
    reducers: {
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
        /* 랜덤 태그를 받아오는 함수 상태 */
        builder.addCase(getRandomTagList.rejected, (state, action) => {
            state.loading = false;
            state.tagList = [];
            state.error = action.payload;
        });
        builder.addCase(getRandomTagList.pending, (state, action) => {
            state.loading = true;
            state.tagList = [];
            state.error = "";
        });
        builder.addCase(getRandomTagList.fulfilled, (state, action) => {
            state.tagList = action.payload;
            state.loading = false;
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

export const { addTag, removeTag, setTagList } = mainTagDataSlice.actions;
export default mainTagDataSlice.reducer;
