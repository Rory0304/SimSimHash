import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TagList from "./TagList";
import SelectedTagList from "./SelectedTagList";
import { getMovieListByTag } from "../../modules/MainPage/tagDataSlice";

function MainPage() {
    const dispatch = useDispatch();
    const { selectedTagList } = useSelector((state) => state.mainTagDataSlice);

    useEffect(() => {
        const debounce = setTimeout(() => {
            return dispatch(getMovieListByTag());
        }, 1000);
        return () => {
            console.log("clear");
            clearTimeout(debounce);
        };
    }, [selectedTagList]);

    return (
        <main>
            <div>
                <h1>#심심해시</h1>
                <p>태그를 선택하여 새로운 영화 취향을 발견해보세요!</p>
            </div>
            <div>
                <SelectedTagList />
                <TagList />
            </div>
        </main>
    );
}
export default MainPage;
