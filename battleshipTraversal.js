
const grid1 = [
  ['W', 'S', 'W', 'W', 'W'],
  ['W', 'S', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'S', 'S'],
  ['S', 'W', 'W', 'S', 'S'],
  ['S', 'W', 'W', 'W', 'W'],
];
// 3

const grid2 = [
  ['S', 'S', 'S', 'S', 'S']
];
// 1

const grid3 = [
  ['W', 'W', 'W', 'S', 'W'],
  ['W', 'S', 'W', 'S', 'W'],
  ['W', 'W', 'W', 'S', 'W'],
  ['W', 'W', 'W', 'S', 'W'],
  ['S', 'W', 'W', 'W', 'S'],
  ['S', 'W', 'W', 'W', 'W'],
];
// 4

const shipCount = grid => {
  let result = 0
  const visited = new Set();

  for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
          // traverse grid find ships
          if (traverse(grid, visited, row, col)) result++
      };
  };

  return result;
};


//helper function for turning Coords to strings
const strCoords = (row, col) => {
  return (`${row},${col}`)
}


//helper function for checking validity of current coords
const invalid = (grid, visited, row, col) => {
  let outOfBounds = grid[row]?.[col] === undefined;
  //the ?. is an operator that checks if the preceding is undefined before executing the latter (will retrun undefined rather than error)
  return (outOfBounds || visited.has(strCoords(row,col)) || grid[row][col] === 'W')
}


//helper function for traversing the graph and retruning whether the initial coords are part of a new ship
const traverse = (grid, visited, initialRow, initailCol) => {
  if (invalid(grid, visited, initialRow, initailCol)) return false; 

  const stack = [[initialRow, initailCol]];

  while (stack.length) {
      const [row, col] = stack.pop();
      
      if (invalid(grid, visited, row, col)) continue; 

      visited.add(strCoords(row,col));
      stack.push(...[[row-1, col],[row+1, col],[row, col+1],[row, col-1]])
  };

  return true;
};




console.log(shipCount(grid3));