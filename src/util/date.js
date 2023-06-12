// 날짜 표시는 YYYY-MM-DD 형태의 9개의 문자열 반환(toISOString)
// date 객체를 전달받음
export const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
  };