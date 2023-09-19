const dijkstra = async (grid, setGridCellFunction, startCell, targetCell, speed, disableSpeedControl) => {
    disableSpeedControl(true);
    setGridCellFunction(startCell.x, startCell.y, { ...grid[startCell.x][startCell.y], distance: 0 });

    let candidates = [grid[startCell.x][startCell.y]];
    let currentNode;

    do {
        currentNode = findMinAmongstCandidates(grid.flat());
        setGridCellFunction(currentNode.x, currentNode.y, { ...currentNode, visited: true });
        candidates = getUnvisitedNeighbors(grid, currentNode.x, currentNode.y);
        updateDistancesAmongstNeighbors(currentNode, candidates, setGridCellFunction);
        candidates = getUnvisitedNeighbors(grid, currentNode.x, currentNode.y);
        await delay(speed);
    } while (currentNode && !grid[targetCell.x][targetCell.y].visited);

    if (currentNode) {
        //set predecessor & path
        while (currentNode.predecessor.x != -1 && currentNode.predecessor.y != -1) {
            setGridCellFunction(currentNode.x, currentNode.y, { ...currentNode, isPredecessor: true });
            currentNode = grid[currentNode.predecessor.x][currentNode.predecessor.y];
            await delay(speed+10);
        }
    }

    disableSpeedControl(false);
    return;
};

const delay = (milliseconds) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
};

const updateDistancesAmongstNeighbors = (currentNode, neighborArray, setGridCellFunction) => {
    const distanceOfCurrentNode = currentNode.distance;
    for (const neighbor of neighborArray) {
        if (distanceOfCurrentNode + 1 < neighbor.distance) {
            setGridCellFunction(neighbor.x, neighbor.y, {
                ...neighbor,
                distance: distanceOfCurrentNode + 1,
                predecessor: { x: currentNode.x, y: currentNode.y },
            });
        }
    }
};

const getUnvisitedNeighbors = (grid, x, y) => {
    const increments = [1, -1];
    const neighbors = [];
    const xBound = grid.length;
    const yBound = grid[0].length;
    for (const increment of increments) {
        const xIncremented = x + increment;
        const yIncremented = y + increment;
        const horizontalNeighbor = xIncremented >= xBound || xIncremented < 0 ? null : grid[x + increment][y];
        const verticalNeighbor = yIncremented >= yBound || yIncremented < 0 ? null : grid[x][y + increment];
        if (horizontalNeighbor && !horizontalNeighbor.visited) {
            neighbors.push(horizontalNeighbor);
        }
        if (verticalNeighbor && !verticalNeighbor.visited) {
            neighbors.push(verticalNeighbor);
        }
    }

    return neighbors;
};

const findMinAmongstCandidates = (candidates) => {
    let minDist = Infinity;
    let currentNode = null;
    for (let i = 0; i < candidates.length; i++) {
        if (!candidates[i].visited && minDist >= candidates[i].distance) {
            minDist = candidates[i].distance;
            currentNode = candidates[i];
        }
    }

    return currentNode;
};

export default dijkstra;
