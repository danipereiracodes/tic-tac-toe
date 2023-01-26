import Square from './Square'
const Winner = ({ winner, resetGame }) => {
  if (winner === null) return null
  return (

    <section className='winner'>
      <div className='text'>
        <h2>
          {
                  winner === false
                    ? 'Draw'
                    : 'Wins'

                }
        </h2>
        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>
        <footer>
          <button onClick={resetGame}> Start over </button>
        </footer>
      </div>
    </section>

  )
}

export default Winner
