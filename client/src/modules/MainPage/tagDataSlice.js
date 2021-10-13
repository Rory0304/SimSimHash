import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sample } from "../../assets/Sample";

const initialState = {
    tagList: [],
    selectedTagList: [],
    initialMovieList: [],
    movieList: [],
    loading: false,
    error: ""
};

//[메인페이지] 15개씩 랜덤 태그를 받아온다.
export const getRandomTagList = createAsyncThunk("GET_TAG_DATA", async (args, ThunkAPI) => {
    let result = [
        "신나는",
        "기쁜",
        "우울한",
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

/* [메인 페이지] 처음 보여줄 영화 목록 슬라이드 */
export const getInitialMovieList = createAsyncThunk(
    "GET_INITIAL_MOVIE_DATA",
    async (args, ThunkAPI) => {
        try {
            let response = await axios.get("/api/movie");
            console.log("deafault 영화 데이터를 성공적으로 불러왔습니다.", response.data);
            return [];
        } catch (err) {
            console.log("default 영화 데이터를 얻어오는데 실패했습니다.", err);
            return [];
        }
    }
);

/* [메인 페이지] 태그와 관련된 영화 리스트를 불러옴 */
export const getMovieListByTag = createAsyncThunk("GET_MOVIE_DATA", async (args, ThunkAPI) => {
    const { mainTagDataSlice } = ThunkAPI.getState();
    try {
        if (mainTagDataSlice.selectedTagList.length < 2) {
            console.log(
                "이미 default 영화 리스트가 존재합니다.",
                mainTagDataSlice.initialMovieList
            );
        } else {
            const filteredMoviesTest = await axios.post("/api/movie", {
                selectedTags: mainTagDataSlice.selectedTagList,
                searchOption: ""
            });
            console.log(filteredMoviesTest.data);
        }

        //DB 구축 시, 없어질 코드
        //현재 백엔드에서 3개씩 태그를 보내주기 때문에, sample tag 12개에 합친다.
        const filteredMovies = sample.filter((movie) =>
            mainTagDataSlice.selectedTagList.includes(movie.total)
        );
        return filteredMovies;
    } catch (err) {
        console.log("태그와 관련된 영화 정보를 얻는데 실패했습니다", err);
        return [];
    }
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
