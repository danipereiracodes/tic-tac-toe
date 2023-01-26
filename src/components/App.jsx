import { useState } from 'react'
import '../app.css'
import confetti from 'canvas-confetti'
import Square from './Square'
import { TURNS } from '../constants'
import checkWinnerFor from '../utils/board'
import Winner from './Winner'

const boardInitialState = Array(9).fill(null)

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')

    return boardFromLocalStorage
      ? JSON.parse(boardFromLocalStorage)
      : boardInitialState
  })
  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')

    return turnFromLocalStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const resetGame = () => {
    setBoard(boardInitialState)
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // save to localStorage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    const newWinner = checkWinnerFor(newBoard)

    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {board.map((el, index) => {
          return (
            <Square index={index} key={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          )
        })}
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      </section>
      <Winner winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
