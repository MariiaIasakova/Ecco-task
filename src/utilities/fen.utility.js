export const parseFEN = (fen) => {
    if (!fen)
        return [false, undefined];

    const fenArr = fen.split(' ');
    const [ piecePlacement, sideToMove, castlingAbility, enPassantTarget, halfMoveClock, fullMoveCounter ] = fenArr;

    const isValid = (fenArr.length === 6) &&
            validatePiecePlacement(piecePlacement) &&
            validateSideToMove(sideToMove) &&
            validateCastlingAbility(castlingAbility) &&
            validateEnPassantTarget(enPassantTarget) &&
            validateHalfMoveClock(halfMoveClock) &&
            validateFullMoveCounter(fullMoveCounter);

    let parsedFEN;
    if (isValid)
        parsedFEN = mapToNotation(fenArr);

    return [isValid, parsedFEN];
}

export const parsePositions = (piecePlacement) => {
    if (!piecePlacement)
        return null;

    const placements = piecePlacement.split('/');
    const positions = [];
    for (let i = placements.length - 1; i >= 0 ; i--) {
        const notation = placements[i];

        if (notation.length === 1) {
            positions.push(new Array(8));
            continue;
        }

        let j = 0;
        const innerArray = [];
        [...notation].forEach(letter => {
            const horizontalIndex = parseInt(letter, 10);
            if (!isNaN(horizontalIndex))
                j += horizontalIndex;
            else {
                innerArray[j++] = letter;
            }
        });
        positions.push(innerArray);
    }

    return positions;
};

const validateRank = (notation) => {
    const hasContinuousNumbers = /\d{2}/.test(notation);

    const letters = notation.split('');

    const hasOnlyValidLetters = () => {
        return !letters.some((letter) => !/[1-8]|[pkqbnrPKQBNR]/.test(letter));
    };

    const totalSquares = letters.reduce((total, letter) => {
        const parsedLetter = parseInt(letter, 10);
        const isInteger = Number.isInteger(parsedLetter);
        return isInteger? (total + parsedLetter) : (total + 1);
    }, 0);

    return ( hasOnlyValidLetters() &&
                !hasContinuousNumbers &&
                totalSquares === 8);
}

const validatePiecePlacement = (notation) => {
    var ranks = notation.split('/');
    if (ranks.length !== 8)
        return false;

    return ranks.reduce((lastVal, rank) => lastVal && validateRank(rank), true);
}

const curry = f => a => b => f(a, b);

const check = curry((regex, str) => regex.test(str));

const validateSideToMove = check(/^(w|b)$/);

const validateCastlingAbility = check(/^-$|^(KQ?k?q?|Qk?q?|kq?|q)$/);

const validateEnPassantTarget = check(/^(-|[a-h][36])$/);

const validateHalfMoveClock = check(/^([0-9]|[1-9][0-9])$/);

const validateFullMoveCounter = check(/^([1-9][0-9]{0,1})$/);

const mapToNotation = (fenArr) => {
    return {
        piecePlacements: fenArr[0],
        sideToMove: fenArr[1],
        castlingAbility: fenArr[2],
        enPassantTarget: fenArr[3],
        halfMoveClock: fenArr[4],
        fullMoveCounter: fenArr[5]
    }
}