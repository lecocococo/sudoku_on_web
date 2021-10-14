import React, { Component } from "react";
import "./App.css";

let board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];
function makeBoard() {
  let num = 1;
  let table = "<table>";

  for (let i = 0; i < 10; i++) {
    table += "<tr>";
    for (let j = 0; j < 9; j++) {
      table += "<td>" + num + "</td>";
    }
    table += "</tr>";
  }
  table += "</table>";
  return table;
}
// subject라는 이름의 태그를 만든다
class Subject extends Component {
  render() {
    return (
      <header>
        <h1>SUDOKU</h1>
        Let's play! lol
      </header>
    );
  }
}
class Map extends Component {
  render() {
    //     let num = 1;
    //     let table = "<table>";

    //     for (let i = 0; i < 10; i++) {
    //       table += "<tr>";
    //       for (let j = 0; j < 9; j++) {
    //         table += "<td>" + num + "</td>";
    //       }
    //       table += "</tr>";
    //     }
    //     table += "</table>";
    //     return { table };
    let board = [
      ["5", "3", ".", ".", "7", ".", ".", ".", "."],
      ["6", ".", ".", "1", "9", "5", ".", ".", "."],
      [".", "9", "8", ".", ".", ".", ".", "6", "."],
      ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
      ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
      ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
      [".", "6", ".", ".", ".", ".", "2", "8", "."],
      [".", ".", ".", "4", "1", "9", ".", ".", "5"],
      [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ];
    const table = board.map((n) => (
      <tr>
        {n.map((m) => (
          <td>{m}</td>
        ))}
      </tr>
    ));
    return <table>{table}</table>;
  }
}

function App() {
  return (
    <div className="App">
      <Subject></Subject>
      <Map></Map>
    </div>
  );
}

export default App;
