import React, {memo, FunctionComponent} from 'react';

interface CellProps {
    aliveness: boolean;
}

const Cell: FunctionComponent<CellProps> = memo((props) => {
    return <div style={{width: 20, height: 20, backgroundColor: props.aliveness ? 'black' : 'yellow'}}></div>
})
export default Cell;
