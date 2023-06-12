import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//component
import { DiaryStateContext } from '../App';
import { emotionList } from '../util/emotion';
import { getStringDate } from '../util/date';
import MyHeader from '../component/MyHeader';
import MyButton from '../component/MyButton';
import styled from 'styled-components';

const DiaryPage = styled.div`
    text-align: center;

    section {
        width: 100%;
        margin-bottom: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    h4 {
        font-size: 22px;
        font-weight: bold;
    }

    .diary_img_wrapper {
        background-color: #ececec;
        width: 250px;
        height: 250px;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    .diary_img_wrapper_1 {
      background-color: #f2e5db;
    }
    .diary_img_wrapper_2 {
      background-color: #fcd35d;
    }
    .diary_img_wrapper_3 {
      background-color: #b2e3c8;
    }
    .diary_img_wrapper_4 {
      background-color: #7ca3c4;
    }
    .diary_img_wrapper_5 {
      background-color: #ffc0bc;
    }

    .emotion_descript {
        font-size: 30px;
        color: white;
        padding-bottom:20px;
    }

    .diary_content_wrapper {
        width: 100%;
        background-color: #ececec;
        border-radius: 5px;
        word-break: keep-all;
        overflow-wrap: break-word;
    }

    .diary_content_wrapper p {
        padding: 20px;
        text-align: left;
        font-size: 20px;
        font-family: 'Yeon Sung';
        font-weight: 400;
        line-height: 2.5;
    }
`;

const Diary = () => {
    const { id } = useParams(); //pathVariable = id
    const diaryList = useContext(DiaryStateContext); //diaryList가져오기
    const navigate = useNavigate(); //이동
    const [data, setData] = useState();

    //데이터는 컴포넌트가 mount된 시점에서 가져오기
    //조건 : 일기데이터가 1개라도 있을 때만 가져오기 (id 오류 방지 형변환)
    //deps : id 나 diaryList가 변할 때만 가져오기

    useEffect(()=>{
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `Feeling_Diary - ${id}번 일기`;
      },[id]);

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );
            console.log(targetDiary); //가져온 id의 일기데이터

            if (targetDiary) {
                //일기가 존재할때
                setData(targetDiary);
            } else {
                alert('존재하지 않는 일기입니다.');
                navigate('/', { replace: true });
            }
        }
    }, [id, diaryList, navigate]);

    if (!data) {
        //데이터가 없으면

        return <DiaryPage>로딩중입니다...</DiaryPage>;
    } else {
        //데이터가 존재한다면 오늘의 감정 불러오기

        const curEmotionData = emotionList.find(
            (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
        );
        console.log(curEmotionData);

        return (
            <DiaryPage>
                {/* header의 조회한 일기 데이터의 날짜를 가져오기 (getStringDate를 받아서 시간객체로) */}
                <MyHeader
                    headText={`${getStringDate(new Date(data.date))} 기록`}
                    leftChild={
                        <MyButton
                            text={'< 뒤로가기'}
                            onClick={() => navigate(-1)}
                        />
                    }
                    rightChild={
                        <MyButton
                            text={'수정하기'}
                            onClick={() => navigate(`/edit/${data.id}`)}
                        />
                    }
                />
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div
                            className={[
                                'diary_img_wrapper',
                                `diary_img_wrapper_${data.emotion}`,
                            ].join(' ')}
                        >
                            <img
                                src={curEmotionData.emotion_img}
                                alt={`${curEmotionData.emotion_descript}`}
                            />
                            <div className="emotion_descript">
                                {curEmotionData.emotion_descript}
                            </div>
                        </div>
                    </section>

                    <section>
                        <h4>오늘의 일기</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </DiaryPage>
        );
    }
};

export default Diary;
