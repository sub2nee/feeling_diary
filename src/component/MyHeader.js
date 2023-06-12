import styled from 'styled-components';

const Header = styled.header`
    padding: 20px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e2e2e2;
`;


const HeaderText = styled.div`
    width: 100%;
    padding-right: 25px;
    font-size: 30px;
    text-align: center;
    
`;

const HeaderBtnLeft = styled.div`
    width: 25%;
    justify-content: flex-start;
`;

const HeaderBtnRight = styled.div`
    width: 25%;
    justify-content: flex-end;
`;



const MyHeader = ({ headText, leftChild, rightChild }) => {
    return (
        <Header>
                <HeaderBtnLeft>{leftChild}</HeaderBtnLeft>
                <HeaderText>{headText}</HeaderText>
                <HeaderBtnRight>{rightChild}</HeaderBtnRight>
        </Header>
    );
};

export default MyHeader;
