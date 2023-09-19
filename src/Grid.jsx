import Cell from './Cell';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dijkstra from './dijkstra';
import { selectors, actions } from './redux_store';

const Grid = ({ speed, disableControls, setAlgorithms, setResetAvailableOnly }) => {
    const [cells, setCells] = useState([]);
    const startCell = useSelector(selectors.selectStartCoords);
    const targetCell = useSelector(selectors.selectTargetCoords);
    const dispatchFunc = useDispatch();

    const initCells = (rows, cols) => {
        const cellArray = Array(rows)
            .fill(0)
            .map((row, x) =>
                Array(cols)
                    .fill({
                        state: 'empty',
                        isTarget: false,
                        isStart: false,
                        isPredecessor: false,
                        isPath: false,
                        isWall: false,
                        visited: false,
                        predecessor: { x: -1, y: -1 },
                        distance: Infinity,
                    })
                    .map((element, y) => ({ ...element, x, y }))
            );
        setCells(cellArray);
        return;
    };

    const changeCell = (x, y, newState) => {
        const newCells = Array.from(cells);
        newCells[x][y] = newState;
        setCells(newCells);
        return;
    };

    const reset = () => {
        initCells(20, 70);
        dispatchFunc({ type: actions.resetAction });
        setResetAvailableOnly(false);
    };

    const callDijkstra = (isStartSelected, isTargetSelected) => {
        if (isStartSelected && isTargetSelected) {
            dijkstra(cells, changeCell, startCell, targetCell, speed, disableControls, setResetAvailableOnly);
        }
    };
    useEffect(() => {
        setAlgorithms({
            dijkstra: callDijkstra,
            reset,
        });
    }, [startCell, targetCell, speed]);

    useEffect(() => reset(), []);

    return (
        <>
            <div className='grid gap-0 grid-cols-70 grid-rows-20'>
                {cells.map((row, x) =>
                    row.map((cell, y) => <Cell key={`${x}_${y}`} updateInfoFunc={(newState) => changeCell(x, y, newState)} infoObj={cell}></Cell>)
                )}
            </div>
        </>
    );
};

export default Grid;
