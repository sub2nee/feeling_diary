import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//component
import MyButton from './MyButton';
import DiaryItem from './DiaryItem';
import styled from 'styled-components';

const DiaryListWrapper = styled.div`
    .menu_wrapper {
        margin-top: 20px;
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;

        .right_col {
            flex-grow: 1;

            button {
                width: 100%;
            }
        }
    }

    .ControlMenu {
        margin-right: 10px;
        border: none;
        border-radius: 5px;
        background-color: #ececec;
        padding: 10px 20px;
        cursor: pointer;
        font-family: 'Nanum Pen Script';
        font-size: 18px;
    }
`;

const sortOptionList = [
    { value: 'latest', name: '최신순' },
    { value: 'oldest', name: '오래된 순' },
];

const filterOptionList = [
    { value: 'all', name: '전부다' },
    { value: 'good', name: '좋은 감정만' },
    { value: 'bad', name: '안좋은 감정만' },
];

const ControlMenu =React.memo(({ value, onChange, optionList }) => {
    return (
      <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState("latest");
    const [filter, setFilter] = useState("all");

    const getProcessedDiaryList = () => {
        // emotion setting
        const filterCallBack = (item) => {
            if (filter === "good") {
              return parseInt(item.emotion) <= 3;
            } else {
              return parseInt(item.emotion) > 3;
            }
          };

        // sorting
        const compare = (a, b) => {
            if (sortType === "latest") {
              return parseInt(b.date) - parseInt(a.date);
            } else {
              return parseInt(a.date) - parseInt(b.date);
            }
          };
          const copyList = JSON.parse(JSON.stringify(diaryList));
      
          const filteredList =
            filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
      
          const sortedList = filteredList.sort(compare);
          return sortedList;
        };

    return (
        <DiaryListWrapper>
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu
                        value={sortType}
                        onChange={setSortType}
                        optionList={sortOptionList}
                    />
                    <ControlMenu
                        value={filter}
                        onChange={setFilter}
                        optionList={filterOptionList}
                    />
                </div>
                <div className="right_col">
                    <MyButton
                        type={'positive'}
                        text={'새 일기쓰기'}
                        onClick={() => navigate('/new')}
                    />
                </div>
            </div>

            {getProcessedDiaryList().map((it) => (
                <DiaryItem key={it.id} {...it} />
            ))}
        </DiaryListWrapper>
    );
};

DiaryList.defaultProps = {
    diaryList: []
};
export default DiaryList;
