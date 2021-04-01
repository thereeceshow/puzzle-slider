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
      gameOn: false
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

    }
  }

  randShuffle() {
    let newArray = [...this.state.boardArray];
    let arrOfRandClicks = [-4, -1, 1, 4]
    for (let i = 0; i < 701; i++) {
      const blankTileFinder = (el) => el.isBlankTile === true;
      let blankPosIndex = newArray.findIndex(blankTileFinder);
      let randClick = blankPosIndex + arrOfRandClicks[Math.floor(Math.random() * 4)]
      newArray[randClick] ? this.tileClick(newArray[randClick].currentPos, randClick) : i--

      // console.log(newArray[randClick].currentPos)

      // this.tileClick()
    }


  }


  // newArray[blankPosIndex].currentPos = clickedTile;
  // newArray[blankPosIndex].isBlankTile = false;
  // newArray[index].currentPos = tempPos;
  // newArray[index].isBlankTile = true;
  // this.setState(
  //   {
  //     boardArray: newArray,
  //     turns: this.state.turns + 1
  //   },
  //   () => console.log(this.state)
  // );
  // // if (legalMoves.includes(clickedTile)) {
  //   console.log('Legal')
  //   newArray[0].currentPos = clickedTile;
  //   newArray[index].currentPos = blank;
  //   this.setState(
  //     {
  //       boardArray: newArray,
  //       turns: this.state.turns + 1 
  //     },
  //     () => console.log(this.state)
  //   );
  // } else {
  //   console.log("Nun-Uh... Won't Do It")
  // }

  // let boardArray = this.state.boardArray;
  // let t = boardArray[index].currentPos;
  // boardArray[index].currentPos = boardArray[0].currentPos;
  // boardArray[0].currentPos = t;
  // this.setState({boardArray});

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

    // const renderArray = this.state.boardArray.map(mapHelper)
    // const renderArray = this.state.boardArray.sort((a, b) => (a.currentPos > b.currentPos) ? 1 : -1)
    const renderArray1 = this.state.boardArray.map(mapHelper)

    return (
      <div className="App container" >
        <h1 className="text-center mt-3 px-2">The Amazing Puzzle Slider Game</h1>
        <div className="row p-4 text-center d-flex justify-content-center">
          {renderArray1}
        </div>
        <div className="d-flex justify-content-center"><button className="btn btn-secondary btn-large text-center" onClick={() => this.randShuffle()}>Shuffle</button></div>
      </div>
    )
  }
}


export default App;
