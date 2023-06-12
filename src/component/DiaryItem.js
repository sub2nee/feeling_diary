import React from 'react';
import { useNavigate } from 'react-router-dom';

//component
import MyButton from './MyButton';
import styled from 'styled-components';

const DiaryItemWrapper = styled.div`
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e2e2e2;
    display: flex;
    justify-content: space-between;

    .emotion_img_wrapper {
        cursor: pointer;
        min-width: 120px;
        height: 80px;
        border-radius: 5px;
        display: flex;
        justify-content: center;

        &.emotion_img_wrapper_1 {
            background-color: #f2e5db;
        }

        &.emotion_img_wrapper_2 {
            background-color: #fcd35d;
        }

        &.emotion_img_wrapper_3 {
            background-color: #b2e3c8;
        }

        &.emotion_img_wrapper_4 {
            background-color: #7ca3c4;
        }

        &.emotion_img_wrapper_5 {
            background-color: #ffc0bc;
        }

        img {
            width: 50%;
        }
    }

    .info_wrapper {
        flex-grow: 1;
        margin-left: 20px;
        cursor: pointer;

        .diary_date {
            font-weight: bold;
            font-size: 25px;
            margin-bottom: 5px;
        }

        .diary_content_preview {
            font-size: 20px;
        }
    }

    .btn_wrapper {
        min-width: 70px;
    }
`;

const DiaryItem = ({ id, emotion, content, date }) => {
    const navigate = useNavigate();
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";
    const strDate = new Date(parseInt(date)).toLocaleDateString();

    const goDetail = () => {
        navigate(`/diary/${id}`);
    };

    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    return (
        <DiaryItemWrapper>
            <div
                className={[
                    'emotion_img_wrapper',
                    `emotion_img_wrapper_${emotion}`,
                ].join(' ')}
            >
                <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt="감정이미지"/>
            </div>
            <div onClick={goDetail} className="info_wrapper">
                <div className="diary_date">{strDate}</div>
                <div className="diary_content_preview">
                    {content.slice(0, 100)}
                </div>
            </div>
            <div className="btn_wrapper">
                <MyButton onClick={goEdit} text={'수정하기'} />
            </div>
        </DiaryItemWrapper>
    );
};

export default React.memo(DiaryItem);
