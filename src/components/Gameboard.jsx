

export default function GameBoard({onSelectSquare ,board}){
    
    // const [gameboard,updateGameBoard]=useState(gameblocks);
    // function handleGameBoard(rowIndex, colIndex){
    //     updateGameBoard((prevGameBoard)=>{
    //         const newGameBoard=[...prevGameBoard.map((innerRow)=>[...innerRow])];
    //         newGameBoard[rowIndex][colIndex]=activePlayer;
    //         return newGameBoard;
    //     });
    //     console.log("Now");
    //     console.log(onSelectSquare);
    //     onSelectSquare();
    // }
    return (
        <ol id="game-board">
            {
            board.map((row,rowIndex)=>(
                <li key={rowIndex}>
                    <ol>
                        {row.map((symbol,colIndex)=>(
                            <li key={colIndex}><button onClick={()=>{onSelectSquare(rowIndex,colIndex)}} disabled={(symbol!=null)}>{ symbol }</button></li>
                        ))}
                    </ol>
                </li>))
            }
        </ol>
    );
};