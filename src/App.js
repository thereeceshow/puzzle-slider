import React from 'react'
import './App.css';
import Tile from './Tile'

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.tileClick = this.tileClick.bind(this)
    this.randShuffle = this.randShuffle.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.state = {
      boardArray: [],
      turns: 0,
      gameOn: false,
      winner: false,
      usePic: 'Reece'
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
    }
    this.setState({ boardArray: newBoardArray })
  }

  tileClick(clickedTile, index, overRide) {
    if ((this.state.gameOn && !this.state.winner) || overRide === 'yes') {
      let newArray = [...this.state.boardArray];
      const blankTileFinder = (el) => el.isBlankTile === true;
      let blankPosIndex = newArray.findIndex(blankTileFinder)
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
    let newArray = [...this.state.boardArray];
    if (!this.state.gameOn) {
      newArray[0].isBlankTile = true;
    }
    setTimeout(() => {
      let arrOfRandClicks = [-4, -1, 1, 4]
      for (let i = 0; i < 701; i++) {
        const blankTileFinder = (el) => el.isBlankTile === true;
        let blankPosIndex = newArray.findIndex(blankTileFinder);
        let randClick = blankPosIndex + arrOfRandClicks[Math.floor(Math.random() * 4)]
        newArray[randClick] ? this.tileClick(newArray[randClick].currentPos, randClick, 'yes') : i--
      }
      this.setState({
        gameOn: true,
        winner: false,
        turns: 0,
      })
    }, 500)
    this.setState({boardArray: newArray})
  }

  checkWin() {
    if (this.state.gameOn && this.state.turns > 1) {
      let test = this.state.boardArray.map((el, i) => el.currentPos === i).includes(false);
      if (!test) {
        let wholeBoard = [...this.state.boardArray];
        wholeBoard[0].isBlankTile = false;
        this.setState({
          boardArray: wholeBoard,
          gameOn: false,
          winner: true,
        })

      }
    }
  }

  handleSelect(e) {
    console.log(e.target.value)
    this.setState({
      usePic: e.target.value
    })
  }

  render() {

    const mapHelper = (value, index) => {
      return (
        <Tile
          value={value}
          key={index}
          index={value.index}
          currentPos={value.currentPos}
          click={this.tileClick}
          emptySquare={value.isBlankTile}
          usePic={this.state.usePic}
        />
      );
    };

    const renderArray = this.state.boardArray.map(mapHelper)

    return (
      <div className="App container text-center">
        <div className="row">
          <h1>Puzzle Slider</h1>
          {this.state.winner ? <h1 className="text-success">WE HAVE A WINNER</h1> : null}
        </div>
        <div className="row mx-auto pt-3 row400">
          {renderArray}
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-secondary btn-large text-center mt-3" onClick={() => this.randShuffle()}>{this.state.gameOn ? 'Shuffle' : 'New Game'}</button>
            {!this.state.gameOn ?
              <select className="form-select mt-3 selectImage mx-auto" aria-label="Default select example" onChange={e => this.handleSelect(e)}>
                <option defaultValue="0">Select Puzzle Image</option>
                <option value="Reece">Reece</option>
                <option value="Code">C.O.D.E.</option>
                <option value="Funk">Funk Raptor</option>
              </select>
              : null}
          </div>
        </div>
      </div>
    )
  }
}


export default App;
