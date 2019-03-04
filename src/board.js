import React from 'react';
import './index.css';
import Square from './square';
import { calculateWinner, calculateTie } from './utils';

class Board extends React.Component {
  state = {
    squares: Array(9).fill(null),
    xIsNext: true,
  }

  handleReset = () => {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
    })
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({squares, xIsNext: !this.state.xIsNext})
  }

  renderSquare(i) {
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    const isTie = calculateTie(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (isTie) {
      status = 'Its a tie';
    }else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button onClick={this.handleReset}>
          Reset
        </button>
      </div>
    );
  }
}

export default Board;