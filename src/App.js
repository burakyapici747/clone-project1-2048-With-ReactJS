import React from 'react';
import './App.css';
import 'animate.css';
import GridRow from './components/GridRow'

export default class App extends React.Component{
  constructor(){
    super();
    this.state = {
      gridStateMap: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    };
    this.createGridCell(2);
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
  }

  createGridCell(cellAmount){
    let newArr = this.state.gridStateMap;
    let randomNumbersArr = [];
    if(this.mapIsEmpty()){
      for(let i = 1; i <= cellAmount; i++){
        randomNumbersArr = this.createRandomNumber(0,4);
        newArr[randomNumbersArr[0][0]][randomNumbersArr[0][1]] = randomNumbersArr[1][0];
      }
      this.setState({gridStateMap: newArr,});
    }
  }

  mapIsEmpty(){
    for(let col = 0; col < this.state.gridStateMap.length; col++){
      for(let row = 0; row < this.state.gridStateMap[col].length; row++){
        if(this.state.gridStateMap[col][row] == 0){
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
    let newArr = this.state.gridStateMap;
    let buffer = 3;
    for(let col = 0; col < this.state.gridStateMap.length; col++){
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
    this.setState({newArr});
    this.createGridCell(1);
  }

  slipToLeft(){
    let newArr = this.state.gridStateMap;
    let buffer = 0;
    for(let col = 0; col < this.state.gridStateMap.length; col++){
      buffer = 0;
      for(let row = 0; row <= 3; row++){        
        if(newArr[col][row] != 0){
          for(let i = row; i > buffer; i--){
            if(newArr[col][i] == newArr[col][i - 1]){
              newArr[col][i - 1] = newArr[col][i - 1] + newArr[col][i];
              newArr[col][i] = 0;
              buffer++;
              this.setState({newArr});
            }else if( ( newArr[col][i] != newArr[col][i - 1] ) && ( newArr[col][i - 1] != 0 ) ){
              buffer++;
            }else{
              newArr[col][i - 1] = newArr[col][i];
              newArr[col][i] = 0;
              this.setState({newArr});
            }
          } 
        }
      }
    }
    this.createGridCell(1);
  }

  slipToTop(){
    let newArr = this.state.gridStateMap;
    let buffer = 0;
    for(let row = this.state.gridStateMap.length - 1; row >= 0; row--){
      buffer = 0;
      for(let col = 0; col <= this.state.gridStateMap.length -1; col++){
        if(newArr[col][row] != 0){
          for(let i = col; i > buffer; i--){
            if(newArr[i][row] == newArr[i-1][row]){
              newArr[i - 1][row] = newArr[i -1][row] + newArr[i][row];
              newArr[i][row] = 0;
              buffer++;
              this.setState({newArr});
            }else if( ( newArr[i][row] != newArr[i-1][row] ) && ( newArr[i-1][row] != 0 ) ){
              buffer++;
            }else{
              newArr[i-1][row] = newArr[i][row];
              newArr[i][row] = 0;
              this.setState({newArr});
            }
          } 
        }
      }
    }
    this.createGridCell(1);
  }

  slipToBottom(){
    let newArr = this.state.gridStateMap;
    let buffer = 3;
    for(let row = this.state.gridStateMap.length - 1; row >= 0; row--){
      buffer = 3;
      for(let col = this.state.gridStateMap.length-1; col >= 0; col--){
        if(newArr[col][row] != 0){
          for(let i = col; i < buffer; i++){
            if(newArr[i][row] == newArr[i+1][row]){
              newArr[i + 1][row] = newArr[i +1][row] + newArr[i][row];
              newArr[i][row] = 0;
              buffer--;
              this.setState({newArr});
            }else if( ( newArr[i][row] != newArr[i+1][row] ) && ( newArr[i+1][row] != 0 ) ){
              buffer--;
            }else{
              newArr[i+1][row] = newArr[i][row];
              newArr[i][row] = 0;
              this.setState({newArr});
            }
          } 
        }
      }
    }
    this.createGridCell(1);
  }


  isSameIndex(col, row){
    if(this.state.gridStateMap[col][row] != 0){
      return true;
    }else{
      return false;
    }
  }

  changeStateMap(value, column, row){
    let newArr = [];
    for(let col = 0; col < this.state.gridStateMap.length; col++){
        for(let row = 0; row < this.state.gridStateMap[col].length; row++){
          newArr.push();
        }
    }
    this.setState({
      gridStateMap: newArr,
    });
  }
  render(){
    return(
      <div className="game-container" onKeyPress={this.slideGridCell}>
        <div className="gameBox">
           <GridRow gridrow={this.state.gridStateMap[0]}/>
           <GridRow gridrow={this.state.gridStateMap[1]}/>
           <GridRow gridrow={this.state.gridStateMap[2]}/>
           <GridRow gridrow={this.state.gridStateMap[3]}/>
         </div>
       </div>  
    );
  }
}