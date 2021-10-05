import { useState, useEffect } from "react";
import { Tag } from "antd";
// import { ReloadOutlined } from "@ant-design/icons";

function MainPage() {
    const [tagList, setTagList] = useState([]);
    const [selectedTagList, setSelectedTagList] = useState([]);
    const { CheckableTag } = Tag;

    useEffect(() => {
        /* 백엔드로부터 태그 리스트 받아오기: 태그 번호로 받아오면 좋을 듯 */
        const requested = [
            { key: 1, name: "#재미있는" },
            { key: 2, name: "#독특한" },
            { key: 3, name: "#유쾌한" },
            { key: 4, name: "#감동적인" },
            { key: 5, name: "#의미있는" },
            { key: 6, name: "#재치있는" },
            { key: 7, name: "#웅장한" },
            { key: 8, name: "#멋있는" },
            { key: 9, name: "#거대한" }
        ];
        setTagList(requested);
    }, []);

    const onSelectTag = (tag) => {
        setSelectedTagList((current) => [...current, tag]);
    };

    const onRemoveSelectedTag = (tagIndex) => {
        const filterTag = selectedTagList.filter((item) => item.key !== tagIndex);
        setSelectedTagList(filterTag);
    };

    return (
        <main>
            <header>
                <h1>#심심해시</h1>
                <p>태그를 선택하여 새로운 영화 취향을 발견해보세요!</p>
            </header>
            <div>
                {/* 선택된 태그 리스트 */}
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

                {/* 태그 리스트 */}
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
                </div>
            </div>
        </main>
    );
}
export default MainPage;
