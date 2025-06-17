import { useState } from "react";
export default function Player({ initialName , symbol ,isActive ,onChange}){
    const [playerName,setPlayerName]=useState(initialName);
    const [isEditing, setEditing] =useState(false);

    function handleEditClick(){
        setEditing((editing)=>!editing);
        if(isEditing)onChange(symbol,playerName);
        
    }
    function handleChange(event){
        console.log(event);
        setPlayerName(event.target.value);
    }
    return (
        <li className={isActive ? 'active': undefined}>
            <span className="player">
              {!isEditing ? <span className="player-name">{playerName}</span> : <input type="text" required value={playerName} onChange={handleChange}></input>}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing?'Save' : "Edit"}</button>
        </li>
    );
};