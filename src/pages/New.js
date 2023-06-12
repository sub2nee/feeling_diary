import React, { useEffect } from 'react'
import DiaryEditor from '../component/DiaryEditor'

const New = () => {

  //title name
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `Feeling_Diary - 새 일기 작성`;
}, []);


  return (
    <div>
      <DiaryEditor />
    </div>
  )
}

export default New

