import React from "react";

const NotationInfo = ({ positions }) => {
    if (!positions)
        return <div className="notations-container" />;

    const {piecePlacements, sideToMove, castlingAbility, enPassantTarget, halfMoveClock, fullMoveCounter} = positions;

    return <div className="notations-container">
        <div className="piece-placement">
            <span className="caption">Piece placement: </span>
            <span className="value">{piecePlacements}</span>
        </div>
        <div className="side-to-move">
            <span className="caption">Side to move: </span>
            <span className="value">{sideToMove}</span>
        </div>
        <div className="castling-ability">
            <span className="caption">Casting ability: </span>
            <span className="value">{castlingAbility}</span>
        </div>
        <div className="en-passant-target">
            <span className="caption">En passant target: </span>
            <span className="value">{enPassantTarget}</span>
        </div>
        <div className="half-move-clock">
            <span className="caption">Half move clock: </span>
            <span className="value">{halfMoveClock}</span>
        </div>
        <div className="full-move-counter">
            <span className="caption">Full move counter: </span>
            <span className="value">{fullMoveCounter}</span>
        </div>
    </div>;
}
export default NotationInfo;