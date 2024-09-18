const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
let isCircleTurn;

const startGame = () => {
    isCircleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
};

const handleClick = (e) => {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'circle' : 'x';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        setTimeout(startGame, 2000); // Reinicia o jogo após 2 segundos
    } else if (isDraw()) {
        setTimeout(startGame, 2000); // Reinicia o jogo após 2 segundos
    } else {
        swapTurns();
    }
};

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
};

const checkWin = (currentClass) => {
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
};

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
};

restartButton.addEventListener('click', startGame);

startGame();
