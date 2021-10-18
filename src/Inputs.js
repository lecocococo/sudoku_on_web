import React, { useState } from "react";
import style from "./Inputs.module.css";
function Inputs() {
  const [text, setText] = useState("");
  // 값 변경 시 이벤트 객체가 파라미터(e)에 담김
  const onChange = (e) => {
    // e.target에는 이벤트가 발생한 input DOM에 대한 정보를 가지고 있음
    // console.log(e.target);
    // 이벤트가 발생한 DOM의 값 가져오기
    // console.log(e.target.value);
    setText(e.target.value);
  };

  return (
    <div>
      <input
        className={`${style.inputs}`}
        onChange={onChange}
        type="text"
        maxLength="1"
        onKeyUp={(e) => {
          const { value } = e.target;
          // value의 값이 숫자가 아닐경우 빈문자열로 replace
          const isNumber = value.replace(/[^0-9]/g, "");
          //backspace의 keyCode값은 8, event의 keycode가 8이면 alert안해주기 위한 코드
          if (isNumber === "" && e.keyCode !== 8) {
            alert("1~9사이의 정수를 입력하세요");
          }
        }}
        value={text}
      />
    </div>
  );
}

export default Inputs;
