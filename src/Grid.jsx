import Cell from './Cell';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dijkstra from './dijkstra';
import { selectors } from './redux_store';

const Grid = () => {
    const [cells, setCells] = useState([]);
    const isStartSelected = useSelector(selectors.selectStartBoolean);
    const isTargetSelected = useSelector(selectors.selectTargetBoolean);
    const startCell = useSelector(selectors.selectStartCoords);
    const targetCell = useSelector(selectors.selectTargetCoords);

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

    useEffect(() => initCells(20, 70), []);
    useEffect(() => {
        if (isStartSelected && isTargetSelected) {
            dijkstra(cells, changeCell, startCell, targetCell);
        }
    }, [isStartSelected, isTargetSelected]);

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
