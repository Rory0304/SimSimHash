/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setTagList, addTag, getTagList, getNewTagList } from "../../modules/MainPage/tagDataSlice";

import { Tag } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const ReloadBtnStyle = css`
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.4rem;
`;

const TagListWrapper = css`
    width: 51rem;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 9px;
`;

const customTagStyle = ({ checked }) => css`
    color: #fff;
    background: ${checked
        ? "linear-gradient(to bottom right, rgb(252, 4, 65), rgba(246, 45, 168, 0.93))"
        : "#45464B"};
    padding: 7px 9px;
    font-size: 1rem;

    &:not(.ant-tag-checkable-checked):hover {
        color: #fff;
        transform: scale(1.1);
    }
`;

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

    const isInSelectedTagList = (tag) => {
        const selectedTagListIndex = selectedTagList.map((selectedTag) => selectedTag.key);
        return selectedTagListIndex.includes(tag.key);
    };

    const onSelectTag = (tag) => {
        if (!isInSelectedTagList(tag)) {
            dispatch(addTag({ tag }));
        }
    };

    return (
        <div css={TagListWrapper}>
            {tagList.map((tag) => (
                <CheckableTag
                    key={tag.key}
                    onClick={() => onSelectTag(tag)}
                    checked={isInSelectedTagList(tag)}
                    css={customTagStyle({ checked: isInSelectedTagList(tag) })}
                >
                    {tag.name}
                </CheckableTag>
            ))}
            <ReloadOutlined onClick={() => reloadTagList()} css={ReloadBtnStyle} />
        </div>
    );
}

export default TagList;
