// 해야할것
// App.js에 export해서 화면에 스도쿠 판이 보이도록
// 버튼 누르면 정답인지 아닌지 확인

export const blankBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
// let count;

//숫자를 넣을때 그 숫자가 적합한지 확인해주는 부분
//행 확인
const checkRow = (sudoku_board, empty_cell, num) => {
  //찾지 못하면 -1반환하기때문
  if (sudoku_board[empty_cell.rowIdx].indexOf(num) === -1) return true;
};

//열 확인
const checkColumn = (sudoku_board, empty_cell, num) => {
  //some()은 인자로 주어진 함수를 배열에 적용해서 하나라도 참이면 true반환
  return !sudoku_board.some((row) => row[empty_cell.colIdx] === num);
};

//3x3 작은박스 확인
const checkSmallBox = (sudoku_board, empty_cell, num) => {
  let box_start_row = empty_cell.rowIdx - (empty_cell.rowIdx % 3);
  let box_start_col = empty_cell.colIdx - (empty_cell.colIdx % 3);
  // let isOkay = true;

  const threeNums = [0, 1, 2];
  for (let box_row of threeNums) {
    for (let box_col of threeNums) {
      if (
        sudoku_board[box_start_row + box_row][box_start_col + box_col] === num
      )
        return false;
    }
  }
  return true;
};

// 행, 열, 3x3 작은박스 확인
const checkIsRight = (sudoku_board, empty_cell, num) => {
  return (
    checkRow(sudoku_board, empty_cell, num) &&
    checkColumn(sudoku_board, empty_cell, num) &&
    checkSmallBox(sudoku_board, empty_cell, num)
  );
};
///////////////////////////////////////////////////////////////////////

//다음 빈 칸을 찾자
const findNextEmptyCell = (sudoku_board) => {
  let empty_cell = { rowIdx: "", colIdx: "" };

  sudoku_board.forEach((row, rowIdx) => {
    if (empty_cell.colIdx !== "") return;

    let firstBlankCell = row.find((col) => col === 0);

    if (firstBlankCell === undefined) return;
    empty_cell.rowIdx = rowIdx;
    empty_cell.colIdx = row.indexOf(firstBlankCell);
  });

  if (empty_cell.colIdx !== "") return empty_cell;
  return false;
};

//1-9 배열
const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// 1~9 셔플!
const numShuffle = (arr) => {
  // numArr 복사(얕은 복사 x)
  let newNumArr = [...numArr];

  for (let i = 0; i < newNumArr.length; i++) {
    //0~9사이의 난수 생성
    let j = Math.floor(Math.random() * (i + 1));
    //swap
    [newNumArr[i], newNumArr[j]] = [newNumArr[j], newNumArr[i]];
  }
  return newNumArr;
};

//칸 채우기
//재귀적으로 호출(백 트래킹 사용)
export const fillBoard = (startBoard) => {
  // 빈 셀을 찾아줌
  const empty_cell = findNextEmptyCell(startBoard);
  //셀이 다 찼으면 리턴
  if (!empty_cell) return startBoard;

  //1~9까지 돌면서 9x9 matrix에 값을 찾아 넣어줌!!!
  let shuffledArray = numShuffle(numArr);
  // console.log(shuffledArray);
  for (let num of shuffledArray) {
    if (checkIsRight(startBoard, empty_cell, num)) {
      startBoard[empty_cell.rowIdx][empty_cell.colIdx] = num;
      if (fillBoard(startBoard)) return startBoard;

      startBoard[empty_cell.rowIdx][empty_cell.colIdx] = 0;
    }
  }
  return false;
};

const newSolvedBoard = (_) => {
  const newBoard = blankBoard.map((row) => row.slice());
  fillBoard(newBoard);
  return newBoard;
};

// 스도쿠 판을 만들기위해 의도적으로 셀을 비우자
const makeBlankCell = (sudoku_board, blanks) => {
  const removedValue = [];

  while (removedValue.length < blanks) {
    const val = Math.floor(Math.random() * 81); //9x9 matrix에서 랜덤하게 비우기 위해서 해주는 작업
    const randomRow = Math.floor(val / 9);
    const randomCol = val % 9;

    if (sudoku_board[randomRow][randomCol] === 0) continue;

    removedValue.push({
      rowIdx: randomRow,
      colIdx: randomCol,
      value: sudoku_board[randomRow][randomCol],
    });

    sudoku_board[randomRow][randomCol] = 0;

    // const problemBoard = sudoku_board.map((row) => row.slice()); // 구멍뚤린판 복사해둠

    if (checkPossibleSolutions(sudoku_board.map((row) => row.slice())))
      sudoku_board[randomRow][randomCol] = removedValue.pop().value;
  }
  return [removedValue, sudoku_board];
};

function checkPossibleSolutions(board) {
  const possibleSolutions = [];
  const emptyCellArray = emptyCellArrayMaker(board);
  for (let idx = 0; idx < emptyCellArray.length; idx++) {
    let duplicatedEmptyCell = [...emptyCellArray];
    // 시작포인트를 계속바꿔줌
    const startingPoint = duplicatedEmptyCell.splice(idx, 1); //idx부터 1개를 삭제하고 삭제한 값을 변수에 담음
    duplicatedEmptyCell.unshift(startingPoint[0]); //맨앞에다가 값넣어줌
    let thisSolution = fillFromArray(
      board.map((row) => row.slice()),
      duplicatedEmptyCell
    );
    possibleSolutions.push(thisSolution.join());
    //Array.from() 메서드는 유사 배열 객체(array-like object)나 반복 가능한 객체(iterable object)를 얕게 복사해 새로운Array 객체를 만듬
    //Set은 중복 되는 정답을 없애기 위해 사용
    if (Array.from(new Set(possibleSolutions)).length > 1) return true;
  }
  return false;
}

function emptyCellArrayMaker(sudoku_board) {
  const listOfEmptyCells = [];
  for (let row of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
    for (let col of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
      if (sudoku_board[row][col] === 0) listOfEmptyCells.push({ row, col });
    }
  }
  return listOfEmptyCells;
}

function fillFromArray(sudoku_board, emptyCellArray) {
  const emptyCell = havingNextEmptyCell(sudoku_board, emptyCellArray);
  if (!emptyCell) return sudoku_board;
  for (let num of numShuffle(numArr)) {
    if (checkIsRight(sudoku_board, emptyCell, num)) {
      sudoku_board[emptyCell.rowIdx][emptyCell.colIdx] = num;
      if (fillFromArray(sudoku_board, emptyCellArray)) return sudoku_board;
      sudoku_board[emptyCell.rowIdx][emptyCell.colIdx] = 0;
    }
  }
  return false;
}

function havingNextEmptyCell(sudoku_board, emptyCellArray) {
  for (let coords of emptyCellArray) {
    if (sudoku_board[coords.row][coords.col] === 0)
      return { rowIdx: coords.row, colIdx: coords.col };
  }
  return false;
}

//////////////////////////////////////////////////////////////////////////////
export function newSudokuBoard(blanks) {
  try {
    // count = 0;
    let solvedBoard = newSolvedBoard();
    console.log("solved");

    let [removedValue, sudoku_board] = makeBlankCell(
      solvedBoard.map((row) => row.slice()),
      blanks
    );
    // console.log(sudoku_board);

    return [removedValue, sudoku_board, solvedBoard];
  } catch (error) {
    // return newSudokuBoard(blanks);
    return console.log(error);
  }
}
