import React, {useEffect} from 'react';
import './App.css';
import {CellItem, cellSize, squareSize, setCellNextState, copyNextState} from './features/grid/gridSlice';
import {useAppDispatch, useAppSelector} from './app/hooks';
import Cell from './features/grid/Cell';

function App() {
  const dispatch = useAppDispatch();
  const grid = useAppSelector((state) => {
    return state.grid as CellItem[][];
  })
  function getNeighbours(row: number, col: number) {
    const potentialNeighbours: [number, number][] = [
        [row - 1, col - 1],
        [row - 1, col],
        [row - 1, col + 1],
        [row, col - 1],
        [row, col + 1],
        [row + 1, col - 1],
        [row + 1, col],
        [row + 1, col + 1]];
    return potentialNeighbours.reduce((accu, value) => {
        const state = grid?.[value[0]]?.[value[1]]?.aliveness;
        if (state) {
            accu.alive += 1
        } else {
            accu.dead += 1
        }
        return accu
    }, {
        dead: 0,
        alive: 0
    })
  }
  function dispatcher(i: number, o: number) {
   const neigh = getNeighbours(i, o)
   dispatch(setCellNextState([{
      row: i,
      col: o,
      nextState: (neigh.alive === 3) || (neigh.alive === 2 && grid[i][o].aliveness)
   }]))
  }
  useEffect(() => {
    const interval = window.setInterval(() => {
        for (let i = 0; i < squareSize; i++) {
            for (let o = 0; o < squareSize; o++) {
                dispatcher(i, o)
            }
        }
        dispatch(copyNextState())
    }, 600)
    return () => {
        window.clearInterval(interval)
    }
  }, [grid])
  return (
      <div className="App">
        <div style={{width: squareSize * cellSize, height: squareSize * cellSize, display: 'flex', flexWrap: 'wrap'}}>
          {grid.map((row, index) => {
            return row.map((b, i) => {
              return <Cell aliveness={b.aliveness} key={`${i}-${index}`} />
            })
          })}
        </div>
      </div>
  );
}

export default App;
