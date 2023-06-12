import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

//component
import MyHeader from '../component/MyHeader';
import MyButton from '../component/MyButton';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion.js';
import { DiaryDispatchContext } from '../App';
import styled from 'styled-components';
import EmotionItem from '../component/EmotionItem';

const DiaryEditorSection = styled.section`
    margin-bottom: 40px;
`;

const DiaryEditorHeading = styled.h4`
    font-size: 22px;
    font-weight: bold;
`;

const DiaryEditorInputDate = styled.input`
    border: none;
    border-radius: 5px;
    background-color: #ececec;
    padding: 10px 20px;
    cursor: pointer;
    font-family: 'Nanum Pen Script';
    font-size: 20px;
`;

const DiaryEditorEmotionListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(5, auto);
    gap: 2%;
`;

const DiaryEditorTextarea = styled.textarea`
    font-family: 'Nanum Pen Script';
    font-size: 20px;
    box-sizing: border-box;
    width: 100%;
    min-height: 200px;
    resize: vertical;
    border: none;
    border-radius: 5px;
    background-color: #ececec;
    padding: 20px;
`;

const DiaryEditorControlBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || '';

//New에 있던 기존 내용을 DiaryEditor로 별도 컴포넌트로 분리
const DiaryEditor = ({ isEdit, originData }) => {
    const [emotion, setEmotion] = useState(3); // 그럭저럭 감정(3) 기본값
    const [date, setDate] = useState(getStringDate(new Date())); // new Date 오늘 날짜 초기값
    const [content, setContent] = useState(); // textarea 상태 변화
    const contentRef = useRef(); // textarea 참조

    // 작성완료 시 App.js에 전달
    const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

    // EmotionItem 클릭 시 해당 state로 변화
    const handleClickEmote = (emotion) => {
        setEmotion(emotion);
    };
    // 경로 이동
    const navigate = useNavigate();

    // 아무 것도 작성하지 않았다면(1글자 미만) textarea 참조받아 focus
    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }
        
        onCreate(date, content, emotion);//일기 작성 시 날짜, 내용, 감정을 onCreate의 인자로
        navigate('/', { replace: true });// 일기 작성 옵션 뒤로가기 막기(replace:true)
    };

    const handleRemove = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            onRemove(originData.id);
            navigate('/', { replace: true });
        }
    };

    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData]);

    return (
        <>
            <MyHeader
                headText={isEdit ? '일기 수정하기' : '새 일기 작성하기'}
                leftChild={
                    <MyButton
                        text={'< 뒤로가기'}
                        onClick={() => navigate(-1)}
                    />
                }
                rightChild={
                    isEdit && (
                        <MyButton
                            text={'삭제하기'}
                            type={'negative'}
                            onClick={handleRemove}
                        />
                    )
                }
            />
            <DiaryEditorSection>
                <DiaryEditorHeading>오늘은 언제인가요?</DiaryEditorHeading>
                <DiaryEditorInputDate
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type={'date'}
                />
            </DiaryEditorSection>

            <DiaryEditorSection>
                <DiaryEditorHeading>오늘의 기분은 어떤가요?</DiaryEditorHeading>
                <DiaryEditorEmotionListWrapper>
                    {emotionList.map((it) => (
                        <EmotionItem
                            key={it.emotion_id}
                            {...it}
                            onClick={handleClickEmote}
                            isSelected={it.emotion_id === emotion}
                        />
                    ))}
                </DiaryEditorEmotionListWrapper>
            </DiaryEditorSection>

            <DiaryEditorSection>
                <DiaryEditorHeading>오늘의 일기</DiaryEditorHeading>
                <>
                    <DiaryEditorTextarea
                        placeholder="오늘 하루의 감정을 기록해보세요"
                        ref={contentRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </>
                <DiaryEditorSection>
                    <DiaryEditorControlBox>
                        <MyButton
                            text={'취소하기'}
                            onClick={() => navigate(-1)}
                        />
                        <MyButton
                            text={'작성완료'}
                            type={'positive'}
                            onClick={handleSubmit}
                        />
                    </DiaryEditorControlBox>
                </DiaryEditorSection>
            </DiaryEditorSection>
        </>
    );
};

export default DiaryEditor;
