import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tag } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { setTagList, addTag, getTagList, getNewTagList } from "../../modules/MainPage/tagDataSlice";

function TagList() {
    const dispatch = useDispatch();
    const { tagList, selectedTagList } = useSelector((state) => state.mainTagDataSlice);
    const { CheckableTag } = Tag;

    const getInitialTagList = async () => {
        const initialTagList = await dispatch(getTagList());
        dispatch(setTagList({ tagList: initialTagList.payload }));
    };

    //임시 테스트 용 (#이슈 : reaload 후, checked값이 반영 안 되고 있는 문제)
    const reloadTagList = async () => {
        const initialTagList = await dispatch(getNewTagList());
        dispatch(setTagList({ tagList: initialTagList.payload }));
    };

    useEffect(() => {
        getInitialTagList();
    }, []);

    const onSelectTag = (tag) => {
        if (selectedTagList.indexOf(tag) === -1) {
            dispatch(addTag({ tag }));
        }
    };

    return (
        <div>
            {tagList.map((tag) => (
                <CheckableTag
                    key={tag.key}
                    onClick={() => onSelectTag(tag)}
                    checked={selectedTagList.indexOf(tag) > -1}
                >
                    {tag.name}
                </CheckableTag>
            ))}
            <ReloadOutlined onClick={() => reloadTagList()} />
        </div>
    );
}

export default TagList;
