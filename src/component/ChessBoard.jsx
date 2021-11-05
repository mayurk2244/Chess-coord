import React, { useState, useEffect } from "react";
import King from "../assets/img/kl.svg";
import KingD from "../assets/img/kd.svg";
import Queen from "../assets/img/ql.svg";
import QueenD from "../assets/img/qd.svg";
import Bishop from "../assets/img/bl.svg";
import BishopD from "../assets/img/bd.svg";
import Knight from "../assets/img/nl.svg";
import KnightD from "../assets/img/nd.svg";
import Rook from "../assets/img/rl.svg";
import RookD from "../assets/img/rd.svg";
import Pawn from "../assets/img/pl.svg";
import PawnD from "../assets/img/pd.svg";
import CoordConfig from "./CoordConfig";

function ChessBoard() {
  const [showCoord, setShowCoord] = useState(true);
  const [chessBoard, setChessBoard] = useState([]);
  const [rotateBoard, setRotateBoard] = useState(false);
  const [coord, setCoord] = useState("");
  const [wrongCoord, setWrongCoord] = useState(false);
  const [chessCoord, setChessCoord] = useState({
    chars: ["a", "b", "c", "d", "e", "f", "g", "h"],
    digits: [1, 2, 3, 4, 5, 6, 7, 8],
  });

  useEffect(() => {
    setChessCoord((cc) => {
      return {
        chars: cc.chars.slice().reverse(),
        digits: cc.digits.slice().reverse(),
      };
    });
  }, [rotateBoard]);

  useEffect(() => {
    setBoard();
  }, [chessCoord]);

  useEffect(() => {
    setRandomCoord();
  }, []);

  let pieceCoord = {
    a1: Rook,
    a8: RookD,
    b1: Knight,
    b8: KnightD,
    c1: Bishop,
    c8: BishopD,
    d1: Queen,
    d8: QueenD,
    e1: King,
    e8: KingD,
    f1: Bishop,
    f8: BishopD,
    g1: Knight,
    g8: KnightD,
    h1: Rook,
    h8: RookD,
  };
  const setBoard = () => {
    let _chessBoard = [];
    let color = "white";
    chessCoord.digits.map((digit) => {
      chessCoord.chars.map((char) => {
        let piece = "";
        if (digit == 7) {
          piece = PawnD;
        }
        if (digit == 2) {
          piece = Pawn;
        }
        if (pieceCoord.hasOwnProperty(char + digit)) {
          piece = pieceCoord[char + digit];
        }
        _chessBoard.push({
          coord: char + digit,
          color,
          piece,
        });
        color = color == "white" ? "black" : "white";
      });
      color = _chessBoard[_chessBoard.length - 1].color;
    });
    setChessBoard(_chessBoard);
  };

  const setRandomCoord = () => {
    let r_c = Math.floor((Math.random() * 10) % 8);
    let r_d = Math.floor((Math.random() * 10) % 8);
    setCoord(chessCoord.chars[r_c] + chessCoord.digits[r_d]);
  };

  const coordCheck = (clickedCoord) => {
    if (coord == clickedCoord) {
      setWrongCoord(false);
      setRandomCoord();
    } else {
      setWrongCoord(true);
    }
  };

  const coordConfig = {
    coord,
    setRotateBoard,
    rotateBoard,
    setRandomCoord,
    showCoord,
    setShowCoord,
    wrongCoord,
  };
  return (
    <>
      <CoordConfig coordConfig={coordConfig} />
      <div className="main-div">
        <div className="coord-char">
          <div className="empty-grid"></div>
          {chessCoord.digits.map((d, index) => {
            if (showCoord) {
              return (
                <div className="digit" key={index}>
                  {d}
                </div>
              );
            }
          })}
        </div>
        <div className="chess-board">
          {chessCoord.chars.map((c, index) => {
            if (showCoord) {
              return (
                <div className="character" key={index}>
                  {c}
                </div>
              );
            }
          })}
          {chessBoard.map((coord, index) => {
            let classes = `${coord.color} box`;
            return (
              <div
                className={classes}
                key={index}
                onClick={() => {
                  coordCheck(coord.coord);
                }}
              >
                {coord.piece ? <img src={coord.piece} alt="" /> : null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default ChessBoard;
