// 할것
// input에 값을 입력했을때 그 값을 스도쿠 배열에 채워두게한다
// 그리고 정답과 맞는지 비교하게 만든다
import React, { Component } from "react";
import { useState } from "react";
import "./App.css";
import * as sudokuMaker from "./make-sudoku-board";
import Inputs from "./Inputs";
import CheckAnswer from "./check-answer";

const b = sudokuMaker.newSudokuBoard(30);
sessionStorage.setItem("solvedBoard", b[1]);

// subject라는 이름의 태그를 만든다
class Subject extends Component {
  render() {
    return (
      <header>
        <h1>SUDOKU</h1>
        <p>Let's play! lol</p>
      </header>
    );
  }
}
class Map extends Component {
  render() {
    // console.log(b);
    const table = b[0].map((n) => (
      <tbody>
        <tr>
          {n.map((m) => (
            <td>
              {/* readOnly는 읽기만 가능할뿐 값변경은 불가능 */}
              {/* disabled도 읽기만 가능할뿐 값변경은 불가능 + form으로 전송시 값 전송 안됨 */}
              {/* 삼항연산자 이용해 . 일 경우에만 값을 입력할 수 있도록함 */}
              {m === 0 ? (
                <Inputs />
              ) : (
                <input type="number" value={m} readOnly />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    ));

    return (
      <div>
        <table id="table">{table}</table>
      </div>
    );
  }
}

class Rule extends Component {
  render() {
    return (
      <div id="explain">
        <h2>Rule:</h2>
        <p> 1. Use Numbers 1-9</p>
        <p>
          2. Don’t Repeat Any Numbers within the row, column or square.(square
          means 3 x 3 spaces)
        </p>
      </div>
    );
  }
}
class Button extends Component {
  render() {
    return <CheckAnswer />;
  }
}
function App() {
  return (
    <div className="App">
      <Subject></Subject>
      <Map></Map>
      <Button></Button>
      <Rule></Rule>

      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    </div>
  );
  // b = null;
}

export default App;

// 참조
// 깃 커밋 메세지 컨벤션: https://richone.tistory.com/26
// 리액트 if문 사용법:https://rios.tistory.com/entry/React-%EB%A6%AC%EC%95%A1%ED%8A%B8-IF-%EB%AC%B8-%EC%82%AC%EC%9A%A9%EB%B2%95
// 스도쿠 판:https://codepen.io/CYass/pen/qwjbRr
// css id,class: https://yjshin.tistory.com/entry/HTML5-CSS3-7-CSS3-id-class-%EC%86%8D%EC%84%B1%ED%9B%84%EC%86%90%EC%9E%90%EC%86%90%EB%8F%99%EC%9C%84-%EC%84%A0%ED%83%9D
// js 스프레드 오퍼레이터(...):https://paperblock.tistory.com/62
// js 배열 메서드: https://offbyone.tistory.com/133
// react 이벤트 처리하기:https://ko.reactjs.org/docs/handling-events.html
// 자바스크립트 배열 초기화(길이를 0으로):https://jamesdreaming.tistory.com/44
