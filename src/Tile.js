function Tile(props) {
    return (
        <>
        <div className="col-3 border border-dark square" onClick={() => props.click(props.currentPos, props.index)}>{!props.emptySquare ? props.currentPos : null }</div>
        </>
    )
}
export default Tile;