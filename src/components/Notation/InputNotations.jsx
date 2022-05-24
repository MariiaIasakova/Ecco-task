import React, { useState } from "react";
import { parseFEN } from "../../utilities/fen.utility";

const InputNotations = ({ setPositions }) => {
    const [ error, setError ] = useState(false);
    const [ value, setValue ] = useState("");

    const inputHandle = () => {
        const [isValid, parsedFEN] = parseFEN(value);
        if (isValid) {
            setError(false);
            setPositions(parsedFEN);
        } else {
            setError(true);
        }
    }

    return <div className="input-notations-container">
        <div className="input-label">Insert Forsyth–Edwards Notation</div>
        <div className="input-container">
            <input type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"}
            />
            <button className="button input-button" onClick={inputHandle}>Push</button>
        </div>
        {error && <p className="error">Invalid value</p>}
    </div>
}

export default InputNotations;