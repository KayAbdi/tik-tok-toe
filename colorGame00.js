const Square = ({id, player, newState}) => {
  const [color, setColor] = React.useState('green');
 
  const [status, setStatus] = React.useState(null);
  const xo = ['O', 'X'];

  const palet = ['red', 'blue', 'green'];
  const getRandomColor = () => palet[Math.floor(Math.random()*3)];

  React.useEffect(() => {
    console.log(`render ${id}`);
    return ()=> console.log(`unmounting square ${id}`)
  })

  return (
    <button onClick={(e) =>{
      let col = getRandomColor();
      setColor(col);
      let nextPlayer = newState(id);
      setStatus(nextPlayer);
      e.target.style.background = col;
      // alert(`I am square ${id}`)
    }}> 
      <h1>{xo[status]}</h1> 
    </button>
  )
}

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [mounted, setMounted] = React.useState(true);
  const [random, setRandom] = React.useState(0);
  const [state, setState] = React.useState(Array(9).fill(null));
  let status = `Player ${player}`;
  let winner = checkWinner(state);
  if (winner != null) status = `Player ${winner} wins`;

  // keep track of state
  const newState = idOfSquare => {
    let thePlayer = player; 
    //lines 41 and 42 moved from here
    state[idOfSquare] = player; //player is current player now
    setState(state); //state is x 0r 0 or null now
    let nextplayer = (player + 1) % 2;
    setPlayer(nextplayer);
    
    return thePlayer;
  };

  const toggle = () => setMounted(!mounted);
  const reRender = () => setRandom(Math.random());
  
  function renderSquare(i) {
    return <Square id={i} player={player} newState={newState}></Square>;
    
  }
  
  return (
    <div className="game-board">
      <div className="grid-row">
        {mounted && renderSquare(0)}
        {mounted && renderSquare(1)}
        {mounted && renderSquare(2)}
      </div>
      <div className="grid-row">
        {mounted && renderSquare(3)}
        {mounted && renderSquare(4)}
        {mounted && renderSquare(5)}
      </div>
      <div className="grid-row">
        {mounted && renderSquare(6)}
        {mounted && renderSquare(7)}
        {mounted && renderSquare(8)}
      </div>
      <div id="info">
        <button onClick={toggle} >Show/Hide</button>
        <button onClick={reRender} >reRender</button>
        <h1>{status}</h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
