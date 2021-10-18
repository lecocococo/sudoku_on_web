import React from "react";
//react의 경우에는 checkAnswer(~) 이런식으로 사용 x
//그리고 호출한 함수에선 합성이벤트(e)를 처리함
function CheckAnswer() {
  const onClick = (e) => {
    let table = document.getElementById("table").getElementsByTagName("tr");
    let arr = [].slice.call(table);
    let result = [];
    // let finish = [];
    for (let i = 0; i < table.length; i++) {
      let finish = "";
      for (let j = 0; j < 9; j++) {
        //sessionStorage와 비교를 하기위해 문자열으로 저장
        finish += arr[i]
          .getElementsByTagName("td")
          [j].getElementsByTagName("input")[0].defaultValue;
      }

      result.push(finish);
    }

    //sessionStorage에 저장된 값을 가져오는데 ,는 없애고 받아온다
    let solvedBoardString = sessionStorage
      .getItem("solvedBoard")
      .replace(/,/g, "");
    //solvedBoardString.match(/.{1,9}/g)는 9개씩 끊어서 배열에 저장된다
    console.log(
      JSON.stringify(result) ===
        JSON.stringify(solvedBoardString.match(/.{1,9}/g))
    );

    if (
      JSON.stringify(result) ===
      JSON.stringify(solvedBoardString.match(/.{1,9}/g))
    ) {
      alert("정답입니다!!!");
      document.location.reload(); //페이지 새로고침(새로운 문제로)
    } else {
      alert("다시 한번 생각해보세요!!!");
    }
  };
  return (
    <div>
      <button id="check" type="button" onClick={onClick}>
        Click here when you Finish
      </button>
    </div>
  );
}
export default CheckAnswer;

// match 함수를 통한 특정 문자 길이로 자르기: https://minaminaworld.tistory.com/90
