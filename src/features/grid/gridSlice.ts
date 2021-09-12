import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const squareSize = 20;
export const cellSize = 20;

export interface CellItem {
    row: number;
    col: number;
    aliveness: boolean;
    nextState: boolean | null;
}

const initialState: CellItem[][] = new Array(squareSize).fill(null).map((_, row) => {
        return new Array(squareSize).fill(null).map((_, col) => {
            return {
                aliveness: !(Math.floor(Math.random() * 10) % 3),
                nextState: null,
                row, col
            }
        })
    })

export const gridSlice = createSlice({
    name: 'grid',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setCellNextState: (state, action: PayloadAction<{
            row: number,
            col: number,
            nextState: boolean
        }[]>) => {
            action.payload.forEach((atom) => {
                state[atom.row][atom.col].nextState = atom.nextState
            })
        },
        copyNextState: (state) => {
            state.forEach((row) => {
                row.forEach((c) => {
                    if (c.nextState !== null) {
                        c.aliveness = c.nextState
                    }
                })
            })
        },
    },
});
export default gridSlice.reducer;
export const {setCellNextState, copyNextState} = gridSlice.actions;
