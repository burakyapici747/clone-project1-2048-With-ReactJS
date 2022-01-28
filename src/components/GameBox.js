import React from "react";
import GameRow from "./GameRow";
import GameNumber from "./GameNumber";
export default class GameBox extends React.Component{

  constructor(props){
      super(props);
      this.state = {
          gameMap: this.props.gameStateMap,
      }
      const self = this;
      window.addEventListener('keydown', function(e){
        if(e.key == "ArrowRight"){
          self.slipToRight();
        }else if(e.key == "ArrowLeft"){
          self.slipToLeft();
        }else if(e.key == "ArrowUp"){
          self.slipToTop();
        }else if(e.key == "ArrowDown"){
          self.slipToBottom();
        }
      });
      this.createGridCell(2);
  }

  createGridCell(cellAmount){
      let newArr = this.state.gameMap;
      let randomNumbersArr = [];
      if(this.mapIsEmpty()){
        for(let i = 1; i <= cellAmount; i++){
          randomNumbersArr = this.createRandomNumber(0,4);
          newArr[randomNumbersArr[0][0]][randomNumbersArr[0][1]] = randomNumbersArr[1][0];
        }
        console.log("calisti");
        this.setState({gameMap: newArr,});
      }
    }
  
  mapIsEmpty(){
    for(let col = 0; col < this.state.gameMap.length; col++){
      for(let row = 0; row < this.state.gameMap[col].length; row++){
        if(this.state.gameMap[col][row] == 0){
          return true;
        }
      }
    }
    return false;
  }

  createRandomNumber(minValue, maxValue){
    let randomCol = 0, randomRow = 0;
    let randomNumber = [2, 4];
    for(;;){
      randomCol = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
      randomRow = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
      if(!this.isSameIndex(randomCol, randomRow)){
        return [[randomCol, randomRow], [randomNumber[Math.floor(Math.random() * (2 - 0)) + 0]]];
      }
    }
  }

  slipToRight(){
    let newArr = this.state.gameMap;
    let buffer = 3;
    for(let col = 0; col < this.state.gameMap.length; col++){
      buffer = 3;
      for(let row = 2; row >= 0; row--){        
        if(newArr[col][row] != 0){
          for(let i = row; i < buffer; i++){
            if(newArr[col][i] == newArr[col][i + 1]){
              newArr[col][i + 1] = newArr[col][i + 1] + newArr[col][i];
              newArr[col][i] = 0;
              buffer--;
            }else if( ( newArr[col][i] != newArr[col][i + 1] ) && ( newArr[col][i + 1] != 0 ) ){
              buffer--;
            }else{
              newArr[col][i+1] = newArr[col][i];
              newArr[col][i] = 0;
              
            }
          } 
        }
      }
    }
    this.setState({gameMap:newArr});
  }

  slipToLeft(){
    let newArr = this.state.gameMap;
    let buffer = 0;
    for(let col = 0; col < this.state.gameMap.length; col++){
      buffer = 0;
      for(let row = 0; row <= 3; row++){        
        if(newArr[col][row] != 0){
          for(let i = row; i > buffer; i--){
            if(newArr[col][i] == newArr[col][i - 1]){
              newArr[col][i - 1] = newArr[col][i - 1] + newArr[col][i];
              newArr[col][i] = 0;
              buffer++;
              this.setState({gameMap:newArr});
            }else if( ( newArr[col][i] != newArr[col][i - 1] ) && ( newArr[col][i - 1] != 0 ) ){
              buffer++;
            }else{
              newArr[col][i - 1] = newArr[col][i];
              newArr[col][i] = 0;
              this.setState({gameMap:newArr});
            }
          } 
        }
      }
    }
    this.setState({newArr});
  }

  slipToTop(){
    let newArr = this.state.gameMap;
    let buffer = 0;
    for(let row = this.state.gameMap.length - 1; row >= 0; row--){
      buffer = 0;
      for(let col = 0; col <= this.state.gameMap.length -1; col++){
        if(newArr[col][row] != 0){
          for(let i = col; i > buffer; i--){
            if(newArr[i][row] == newArr[i-1][row]){
              newArr[i - 1][row] = newArr[i -1][row] + newArr[i][row];
              newArr[i][row] = 0;
              buffer++;
              this.setState({gameMap:newArr});
            }else if( ( newArr[i][row] != newArr[i-1][row] ) && ( newArr[i-1][row] != 0 ) ){
              buffer++;
            }else{
              newArr[i-1][row] = newArr[i][row];
              newArr[i][row] = 0;
              this.setState({gameMap:newArr});
            }
          } 
        }
      }
    }
    this.setState({newArr});
  }

  slipToBottom(){
    let newArr = this.state.gameMap;
    let buffer = 3;
    for(let row = this.state.gameMap.length - 1; row >= 0; row--){
      buffer = 3;
      for(let col = this.state.gameMap.length-1; col >= 0; col--){
        if(newArr[col][row] != 0){
          for(let i = col; i < buffer; i++){
            if(newArr[i][row] == newArr[i+1][row]){
              newArr[i + 1][row] = newArr[i +1][row] + newArr[i][row];
              newArr[i][row] = 0;
              buffer--;
              this.setState({gameMap:newArr});
            }else if( ( newArr[i][row] != newArr[i+1][row] ) && ( newArr[i+1][row] != 0 ) ){
              buffer--;
            }else{
              newArr[i+1][row] = newArr[i][row];
              newArr[i][row] = 0;
              this.setState({gameMap:newArr});
            }
          } 
        }
      }
    }
    this.setState({newArr});
  }

  isSameIndex(col, row){
    if(this.state.gameMap[col][row] != 0){
      return true;
    }else{
      return false;
    }
  }
  
  changeStateMap(value, column, row){
    let newArr = [];
    for(let col = 0; col < this.state.gameMap.length; col++){
        for(let row = 0; row < this.state.gameMap[col].length; row++){
          newArr.push();
        }
    }
    this.setState({
      gameMap: newArr,
    });
  }

  calculateLocation(col, row){
    return [((col * 106.25) + (col+1) * 15), ((row * 106.25) + (row+1) * 15)];
  }

  render(){
    return(
      <div className="gameBox">
        {this.state.gameMap.map(
          (element, index) => {
            return(
                <GameRow key={index} id={index} value={element}/>
            );
          }
        )}
        {this.state.gameMap.map(
          (colValue, colIndex) => {
            return this.state.gameMap[colIndex].map(
              (cellValue, cellIndex) => {
                if(cellValue != 0){
                  return(
                    <GameNumber value={cellValue} key={cellIndex} row={colIndex} col={cellIndex} location={this.calculateLocation}/>
                  );
                }
              }
            )
          }
        )}
      </div>
    );
  }
}