# feeling_diary (React)
감정일기 https://feeling-diary.web.app/ <br>
Udemy - 한입크기로 잘라 먹는 리액트



## :computer: 사용 기술
Design tool: Adobe Photoshop

Editor: VScode

Lang

-React

배포:fireBase




![setting](https://github.com/sub2nee/feeling_diary/assets/121946266/810fa4d3-6300-4c57-82cf-b5ec5251a730)
---

## :pushpin: 구현 기능

![HOME](https://github.com/sub2nee/feeling_diary/assets/121946266/f9b1b46a-ac9c-481a-9a84-07055a49cad1)

> # Home
> * MyHeader 컴포넌트 : `이전달이동, 연도월, 다음달이동버튼` <br>
> * DiaryList 컴포넌트 : `순서정렬 select, 감정필터 select, Mybutton 컴포넌트(새 일기쓰기)` <br>
> * DiaryItem 컴포넌트 : `감정점수 이미지, 일기작성일, 일기내용(최대 100자), Mybutton 컴포넌트(수정하기)`<br>

![CREATE](https://github.com/sub2nee/feeling_diary/assets/121946266/f6cd6bd8-b9e0-4eba-b481-f9891221ee3d)

> # New (일기 작성)
> * New에 있던 기존 내용을 DiaryEditor로 별도 컴포넌트로 분리 (DiaryEditor는 생성 후 import)
> * 오늘 날짜 달력 (기본 datepicker)에 날짜 표시, 새 일기 작성 시 당일 날짜 표시 (useState)
> * 취소하기 시 이전 화면 이동 (useNavigate)
> * 작성완료 시 작성된 데이터 props으로 전달 (DiaryDispatchContext)

![EDIT](https://github.com/sub2nee/feeling_diary/assets/121946266/52a05b9a-8180-4812-a660-ba97039ad750)
> # EDIT (일기 수정) 
> * 수정 시 useEffect로 원본데이터 받아오기 (isEdit, originData) : 수정 페이지에서만 useEffect가 동작
> * 수정 시 MyHeader 제목 변경 (일기 수정하기)

![Diary](https://github.com/sub2nee/feeling_diary/assets/121946266/9c2a84db-5ab0-4c69-b5bd-1b741da82ce3)
> # Diary (일기 상세페이지)
> * 중복 사용할 수 있는 공통 코드가 있다면 별도로 디렉토리를 생성 후 해당 코드를 이동시켜 export해 재사용
> * 오늘 날짜를 YY-MM-DD 형식으로 구하는 getStringDate 함수 > date.js


![sort-ver 1](https://github.com/sub2nee/feeling_diary/assets/121946266/64563f1c-d33b-4d94-b0b9-6fa76bb1b4b0)
> # sort (감정별)
> * 감정별로 나눠 좋은감정 / 나쁜감정을 나눠 볼 수 있는 기능 구현


![sort-ver 2](https://github.com/sub2nee/feeling_diary/assets/121946266/26981496-d4ea-477c-bc47-7e095216d8fe)
> # sort (기간별)
> * 최신순, 오래된 순으로 기간별로 나눠서 볼 수 있는 기능 구현


![Open Graph](https://github.com/sub2nee/feeling_diary/assets/121946266/54755376-10a4-4ec4-aaf0-491b0db4979f)
> # Firebase 배포 & Open Graph
> * Firebase 배포 전 index.html을 수정하여 Open Graph에 보여지는 내용 수정
> * KaKao Open Graph 설정 후 나타나는 화면
