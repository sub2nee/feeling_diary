import React from 'react';
import styled from 'styled-components';

const EmotionItems = styled.div`
    cursor: pointer;
    border-radius: 5px;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const EmotionItemImage = styled.img`
    width: 50%;
    margin-bottom: 10px;
`;

const EmotionItemText = styled.span`
    font-size: 18px;
`;
const EmotionItemOff = styled(EmotionItems)`
    background-color: #ececec;
`;

const EmotionItemOn1 = styled(EmotionItems)`
    background-color: #f2e5db;
    color: white;
`;

const EmotionItemOn2 = styled(EmotionItems)`
    background-color: #fcd35d;
    color: white;
`;

const EmotionItemOn3 = styled(EmotionItems)`
    background-color: #b2e3c8;
    color: white;
`;

const EmotionItemOn4 = styled(EmotionItems)`
    background-color: #7ca3c4;
    color: white;
`;

const EmotionItemOn5 = styled(EmotionItems)`
    background-color: #ffc0bc;
    color: white;
`;
const EmotionItem = ({
    emotion_id,
    emotion_img,
    emotion_descript,
    onClick,
    isSelected,
}) => {
    const getEmotionItemStyle = () => {
        if (isSelected) {
            switch (emotion_id) {
                case 1:
                    return EmotionItemOn1;
                case 2:
                    return EmotionItemOn2;
                case 3:
                    return EmotionItemOn3;
                case 4:
                    return EmotionItemOn4;
                case 5:
                    return EmotionItemOn5;
                default:
                    return EmotionItems;
            }
        } else {
            return EmotionItemOff;
        }
    };

    const EmotionItemStyle = getEmotionItemStyle();

    return (
        <EmotionItemStyle onClick={() => onClick(emotion_id)}>
            <EmotionItemImage src={emotion_img} />
            <EmotionItemText>{emotion_descript}</EmotionItemText>
        </EmotionItemStyle>
    );
};

export default React.memo(EmotionItem);
