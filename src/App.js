import React from 'react'
import './App.css';
import Tile from './Tile'

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.tileClick = this.tileClick.bind(this)
    this.randShuffle = this.randShuffle.bind(this)
    this.state = {
      boardArray: [],
      turns: 0,
      gameOn: false,
      winner: false,
    }
  }

  componentDidMount() {
    let newBoardArray = [...this.state.boardArray];
    for (let i = 0; i < 16; i++) {
      newBoardArray = newBoardArray.concat({
        index: i,
        winCond: i,
        currentPos: i,
        isBlankTile: false
      })
    } newBoardArray[0].isBlankTile = true
    this.setState({ boardArray: newBoardArray })
  }

  tileClick(clickedTile, index) {
    if (this.state.gameOn && !this.state.winner) {
      let newArray = [...this.state.boardArray];
      const blankTileFinder = (el) => el.isBlankTile === true;
      let blankPosIndex = newArray.findIndex(blankTileFinder)
      console.log(blankPosIndex)
      let tempPos = newArray[blankPosIndex].currentPos
      let blankRow = Math.floor(blankPosIndex / 4);
      let blankCol = blankPosIndex % 4;
      let clickRow = Math.floor(index / 4);
      let clickCol = index % 4;
      if (((clickCol === blankCol) && (Math.abs(blankRow - clickRow) === 1)) || ((clickRow === blankRow) && (Math.abs(blankCol - clickCol) === 1))) {
        newArray[blankPosIndex].currentPos = clickedTile;
        newArray[blankPosIndex].isBlankTile = false;
        newArray[index].currentPos = tempPos;
        newArray[index].isBlankTile = true;
        this.setState(
          {
            boardArray: newArray,
            turns: this.state.turns + 1
          },
          () => console.log(this.state)
        );

      } this.checkWin()
    }
  }

  randShuffle() {
    this.state.gameOn = true;
    let newArray = [...this.state.boardArray];
    let arrOfRandClicks = [-4, -1, 1, 4]
    for (let i = 0; i < 701; i++) {
      const blankTileFinder = (el) => el.isBlankTile === true;
      let blankPosIndex = newArray.findIndex(blankTileFinder);
      let randClick = blankPosIndex + arrOfRandClicks[Math.floor(Math.random() * 4)]
      newArray[randClick] ? this.tileClick(newArray[randClick].currentPos, randClick) : i--
    }
    this.setState({ 
      gameOn: true,
      turns: 0,
    })
  }

  checkWin() {
    if (this.state.gameOn && this.state.turns > 1) {
      let test = this.state.boardArray.map((el, i) => el.currentPos === i).includes(false);
      if (!test) {
        this.setState({
          gameOn: false,
          winner: true,
        })

      }
    }
  }

  render() {

    const mapHelper = (value, index) => {
      return (
        <Tile
          key={index}
          index={value.index}
          currentPos={value.currentPos}
          click={this.tileClick}
          emptySquare={value.isBlankTile}
        />
      );
    };

    const renderArray1 = this.state.boardArray.map(mapHelper)

    return (
      <div className="App container" >
        <h1 className="text-center mt-3 px-2">The Amazing Puzzle Slider Game</h1>
        {this.state.winner ? <h1 className="text-center mt-3 px-2 text-success">WE HAVE A WINNER</h1> : null}
        <div className="row p-4 text-center d-flex justify-content-center">
          {renderArray1}
        </div>
        <div className="d-flex justify-content-center"><button className="btn btn-secondary btn-large text-center" onClick={() => this.randShuffle()}>{this.state.gameOn ? 'Shuffle' : 'New Game'}</button></div>
      </div>
    )
  }
}


export default App;
