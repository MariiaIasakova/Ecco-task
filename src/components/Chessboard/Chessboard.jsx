import React from "react";

import { getConfiguration } from "../../configurations/chessboard.config";
import { parsePositions } from "../../utilities/fen.utility";

import "./Chessboard.css";

const Chessboard = ({ piecePlacements }) => {
    const { horizontalAxis, verticalAxis } = getConfiguration();

    const positions = parsePositions(piecePlacements);
    let fields = [];
    for (let v = verticalAxis.length - 1; v >= 0; v--) {
        for (let h = 0; h < horizontalAxis.length; h++) {
            const position = positions ? positions[v][h] : null;
            const fieldClassNames = `field ${checkFullOpposite(v, h) ? "beige": ""}`;
            fields.push(<div key={`${v}-${h}`}
                className={fieldClassNames}>
                <div className="position">{horizontalAxis[h]}{verticalAxis[v]}</div>
                {position && <div className="piece">{position}</div>}
            </div>);
        }
    }

    return <div className="chessboard-container">
        {fields}
    </div>
}

const checkFullOpposite = (i, j) => {
    return checkOpposite(i, j) || checkOpposite(j, i);
}

const checkOpposite = (i, j) => {
    return isEven(i) && isOdd(j);
}

const isOdd = (num) => {
    return !isEven(num);
};

const isEven = (num) => {
    return !(num % 2);
};

export default Chessboard;