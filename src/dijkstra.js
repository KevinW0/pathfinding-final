const dijkstra = async (grid, setGridCellFunction, startCell, targetCell) => {
    setGridCellFunction(startCell.x, startCell.y, { ...grid[startCell.x][startCell.y], distance: 0, visited: true });
    let candidates = [grid[startCell.x][startCell.y]];

    while (candidates.length != 0 && !grid[targetCell.x][targetCell.y].visited) {
        const currentNode = findMinAmongstCandidates(candidates);

        setGridCellFunction(currentNode.x, currentNode.y, { ...currentNode, visited: true });
        candidates = getUnvisitedNeighbors(grid, currentNode.x, currentNode.y);
        updateDistancesAmongstNeighbors(currentNode.distance, candidates, setGridCellFunction);
        candidates = getUnvisitedNeighbors(grid, currentNode.x, currentNode.y);
        await delay(20);
    }

    return;
};

const delay = (milliseconds) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
};

const updateDistancesAmongstNeighbors = (distanceOfCurrentNode, neighborArray, setGridCellFunction) => {
    for (const neighbor of neighborArray) {
        if (distanceOfCurrentNode + 1 < neighbor.distance) {
            setGridCellFunction(neighbor.x, neighbor.y, { ...neighbor, distance: distanceOfCurrentNode + 1 });
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
        if (minDist >= candidates[i].distance) {
            minDist = candidates[i].distance;
            currentNode = candidates[i];
        }
    }

    return currentNode;
};

export default dijkstra;
