import React, { useState } from "react";
function Score() {
  // useState의 내부 파라미터로는 기본값을 넣어줘야함(계속 0을 넣으니 안됬던것)
  let [score, setScore] = useState(sessionStorage.getItem("score"));
  const onReset = (e) => {
    sessionStorage.setItem("score", 0);
    setScore(sessionStorage.getItem("score"));
  };
  return (
    <div id="scoreBoard">
      <p>Score: </p>
      <span>{score}</span>
      <button onClick={onReset}>리셋</button>
    </div>
  );
}

export default Score;
