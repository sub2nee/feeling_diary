import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useReducer, useRef } from 'react';

//pages
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

//  component


const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case "INIT": {
          return action.data;
        }
        case "CREATE": {
          newState = [action.data, ...state];
          break;
        }
        case "REMOVE": {
          newState = state.filter((it) => it.id !== action.targetId);
          break;
        }
        case "EDIT": {
          newState = state.map((it) =>
            it.id === action.data.id ? { ...action.data } : it
          );
          break;
        }
        default:
          return state;
      }
    
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    };

    export const DiaryStateContext = React.createContext();
    export const DiaryDispatchContext = React.createContext();


const dummyData = [
    {
      id: 1,
      emotion: 1,
      content: "오늘의 일기 1번",
      date: new Date().getTime()
    },
    {
      id: 2,
      emotion: 2,
      content: "오늘의 일기 2번",
      date: new Date().getTime()
    },
    {
      id: 3,
      emotion: 3,
      content: "오늘의 일기 3번",
      date: new Date().getTime()
    },
    {
      id: 4,
      emotion: 4,
      content: "오늘의 일기 4번",
      date: new Date().getTime()
    },
    {
      id: 5,
      emotion: 5,
      content: "오늘의 일기 5번",
      date: new Date().getTime()
    },
    {
        id: 6,
        emotion: 6,
        content: "오늘의 일기 6번",
        date: new Date().getTime()
      }
  ]

function App() {
    const [data, dispatch] = useReducer(reducer, dummyData);
    // console.log(new Date().getTime());
    console.log(dummyData);
    
    //일기 id로 사용
    const dataId = useRef(0);

    //CREATE
    const onCreate = (date, content, emotion) => {
        dispatch({
            type: 'CREATE',
            data: {
                id: dataId.current,
                date: new Date(date).getTime(),
                content,
                emotion,
            },
        });
        dataId.current += 1;
    };
    
    // REMOVE
    const onRemove = (targetId) => {
        dispatch({ type: 'REMOVE', targetId });
    };

    // EDIT
    const onEdit = (targetId, date, content, emotion) => {
        dispatch({
            type: 'EDIT',
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                content,
                emotion,
            },
        });
    };

    return (
        <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/new" element={<New />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
    );
}

export default App;
