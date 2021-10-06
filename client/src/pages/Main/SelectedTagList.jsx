import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tag } from "antd";

import { removeTag } from "../../modules/MainPage/tagDataSlice";

function SelectedTagList() {
    const dispatch = useDispatch();
    const { selectedTagList } = useSelector((state) => state.mainTagDataSlice);

    const onRemoveSelectedTag = (tagIndex) => {
        dispatch(removeTag({ tagIndex }));
    };

    return (
        <div>
            {selectedTagList.map((selectedTag) => (
                <Tag
                    color="geekblue"
                    key={selectedTag.key}
                    onClose={() => onRemoveSelectedTag(selectedTag.key)}
                    closable
                >
                    {selectedTag.name}
                </Tag>
            ))}
        </div>
    );
}

export default SelectedTagList;
