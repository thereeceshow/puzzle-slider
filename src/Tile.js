import React from 'react'
import Reece from './Reece.jpg'
import Funk from './funk-raptor.jpg'


function Tile(props) {
    let top = -100 * Math.floor(props.currentPos / 4);
    let left = -100 * (props.currentPos % 4);

    return (
        <>
            <div className="col-3 border border-dark overflow-hidden position-relative square" onClick={() => props.click(props.currentPos, props.index)}>
                {/* {!props.emptySquare ? props.currentPos : null } */}
                {!props.emptySquare && <img className="position-absolute" src={props.usePic === 'Reece' ? Reece : Funk} style={{ top, left }}></img>}
            </div>
        </>
    )
}
export default Tile;