import React from "react";
import GameRow from "./GameRow";
import GameNumber from "./GameNumber";
export default class GameBox extends React.Component{

  constructor(props){
      super(props);
      this.state = {
        gameMap: [
          0,0,0,0,
          0,0,0,0,
          0,0,0,0,
          0,0,0,0,
        ],
        gameIdMap: [
          0,0,0,0,
          0,0,0,0,
          0,0,0,0,
          0,0,0,0,
        ],
        arr: [
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
        ],
        gameNextValue: 1,
      }
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.removedData = [];
      this.rowSize = 4;
      this.colSize = 4;
      this.createBox(2);
  }
  
  handleKeyDown(event){
    if(event.keyCode === 39){//RightArrow
      this.slipToRight();
    }else if(event.keyCode === 38){//TopArrow
      this.slipToTop();
    }else if(event.keyCode === 37){//LeftArrow
      this.slipToLeft();
    }else if(event.keyCode === 40){//BottomArrow
      this.slipToBottom();
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  createBox(amount){
    for(let i = 1; i <= amount; i++){
      this.createRandomForBoxNumber();
    }
  }

  createRandomForBoxNumber(){
    let randomRow = 0, randomCol = 0;
    let newArrForGameMap = this.state.gameMap;
    let newArrForGameIdMap = this.state.gameIdMap;
    while(!this.gameMapIsFull()){
      randomRow = Math.floor(Math.random() * this.rowSize);
      randomCol = Math.floor(Math.random() * this.colSize);
      if(this.isThatSlotEmpty(randomRow, randomCol)){
        newArrForGameMap[this.getId(randomRow, randomCol)] = this.createRandomForNumber();
        if(this.removedData.length > 0){
          newArrForGameIdMap[this.getId(randomRow, randomCol)] = this.removedData.shift();
        }else{
          newArrForGameIdMap[this.getId(randomRow, randomCol)] = this.state.gameNextValue++;
        }
        break;
      }
    }
    this.setState({gameMap: newArrForGameMap, gameIdMap: newArrForGameIdMap});
  }


  gameMapIsFull(){
    for(let row = 0; row < this.rowSize; row++){
      for(let col = 0; col < this.colSize; col++){
        if(this.state.gameMap[this.getId(row, col)] == 0){
          return false;
        }
      }
    }
    return true;
  }

  isThatSlotEmpty(row, col){
    if(this.state.gameMap[this.getId(row, col)] == 0){
      return true;
    }else{
      return false;
    }
    
  }

  createRandomForNumber(numberOptions = {numbers: [2, 4], percent: [90, 10]}){
    let randomForPercent = Math.floor(Math.random() * (100 - 1) ) + 1;
    let _randomForPercentBuffer = 0;
    for(let i = 0; i < numberOptions.percent.length; i++){
      if( (randomForPercent >= _randomForPercentBuffer)  && (randomForPercent <= (_randomForPercentBuffer + numberOptions.percent[i])) ){
        return numberOptions.numbers[i];
      }
      _randomForPercentBuffer += numberOptions.percent[i];
    }
  }

  calculateLocation(row, col){
    let location = {
      top: ((row * 106.25) + (row+1) * 15),
      left: ((col * 106.25) + (col+1) * 15),
    }
    return location;
  }

  getValue(){
  }

  getId(row, col){
    return ((this.rowSize * row) + col);
  }

  getColAndRow(id){
    let row = Math.floor(id / this.rowSize);
    let col = Math.floor(id % this.colSize);
    return {row: row, col: col};
  }

  slipToRight(){
    let _bufferGameMapArr = this.state.gameMap;
    let _bufferGameIdMapArr = this.state.gameIdMap;
    let _currentIndexBuffer = 3;
    for(let row = 0; row < this.rowSize; row++){
      _currentIndexBuffer = 3;
      for(let col = this.colSize - 2; col >= 0; col--){
        if(_bufferGameMapArr[this.getId(row, col)] != 0){
          for(let bufferIndexNumber = col; bufferIndexNumber < _currentIndexBuffer; bufferIndexNumber++){
            if(_bufferGameMapArr[this.getId(row, bufferIndexNumber)] == _bufferGameMapArr[this.getId(row, bufferIndexNumber + 1)]){
              //gameMapArr
              _bufferGameMapArr[this.getId(row, bufferIndexNumber + 1)] = _bufferGameMapArr[this.getId(row, bufferIndexNumber + 1)] + _bufferGameMapArr[this.getId(row, bufferIndexNumber)];
              _bufferGameMapArr[this.getId(row, bufferIndexNumber)] = 0;
              
              //gameIdMapArr
              this.removedData.push(_bufferGameIdMapArr[this.getId(row, bufferIndexNumber + 1)]);
              _bufferGameIdMapArr[this.getId(row, bufferIndexNumber + 1)] = _bufferGameIdMapArr[this.getId(row, bufferIndexNumber)];
              _bufferGameIdMapArr[this.getId(row, bufferIndexNumber)] = 0;

              _currentIndexBuffer--;
            }else if(_bufferGameMapArr[this.getId(row, bufferIndexNumber)] != _bufferGameMapArr[this.getId(row, bufferIndexNumber + 1)] && (_bufferGameMapArr[this.getId(row, bufferIndexNumber + 1)] != 0)){
              _currentIndexBuffer--;
            }else if( _bufferGameMapArr[this.getId(row, bufferIndexNumber + 1)]== 0){
              //gameMapArr
              _bufferGameMapArr[this.getId(row, bufferIndexNumber + 1)] = _bufferGameMapArr[this.getId(row, bufferIndexNumber)];
              _bufferGameMapArr[this.getId(row, bufferIndexNumber)] = 0;
              //gameIdMapArr
              _bufferGameIdMapArr[this.getId(row, bufferIndexNumber + 1)] = _bufferGameIdMapArr[this.getId(row, bufferIndexNumber)];
              _bufferGameIdMapArr[this.getId(row, bufferIndexNumber)] = 0;
            }
          }
        }
      }
    }
    this.setState({gameMap: _bufferGameMapArr, gameIdMap: _bufferGameIdMapArr});
    this.createBox(1); 
  }

  slipToLeft(){
    let _bufferGameMapArr = this.state.gameMap;
    let _bufferGameIdMapArr = this.state.gameIdMap;
    let _currentIndexBuffer = 0;
    for(let row = 0; row < this.rowSize; row++){
      _currentIndexBuffer = 0;
      for(let col = 1; col < this.colSize; col++){
        if(_bufferGameMapArr[this.getId(row, col)] != 0){
          for(let bufferIndexNumber = col; bufferIndexNumber > _currentIndexBuffer; bufferIndexNumber--){
            if(_bufferGameMapArr[this.getId(row, bufferIndexNumber)] == _bufferGameMapArr[this.getId(row, bufferIndexNumber - 1)]){

              //gameMapArr
              _bufferGameMapArr[this.getId(row, bufferIndexNumber -1)] = _bufferGameMapArr[this.getId(row, bufferIndexNumber - 1)] + _bufferGameMapArr[this.getId(row, bufferIndexNumber)];
              _bufferGameMapArr[this.getId(row, bufferIndexNumber)] = 0;
              
              //gameIdMapArr
              this.removedData.push(_bufferGameIdMapArr[this.getId(row, bufferIndexNumber - 1)]);
              _bufferGameIdMapArr[this.getId(row, bufferIndexNumber - 1)] = _bufferGameIdMapArr[this.getId(row, bufferIndexNumber)];
              _bufferGameIdMapArr[this.getId(row, bufferIndexNumber)] = 0;

              _currentIndexBuffer++;
            }else if((_bufferGameMapArr[this.getId(row, bufferIndexNumber)] != _bufferGameMapArr[this.getId(row, bufferIndexNumber - 1)]) && (_bufferGameMapArr[this.getId(row, bufferIndexNumber - 1)] != 0)){
              _currentIndexBuffer++;
            }else if( _bufferGameMapArr[this.getId(row, bufferIndexNumber - 1)] == 0){
              //gameMapArr
              _bufferGameMapArr[this.getId(row, bufferIndexNumber - 1)] = _bufferGameMapArr[this.getId(row, bufferIndexNumber)];
              _bufferGameMapArr[this.getId(row, bufferIndexNumber)] = 0;
              //gameIdMapArr
              _bufferGameIdMapArr[this.getId(row, bufferIndexNumber - 1)] = _bufferGameIdMapArr[this.getId(row, bufferIndexNumber)];
              _bufferGameIdMapArr[this.getId(row, bufferIndexNumber)] = 0;
            }
          }
        }
      }
    }
    this.setState({gameMap: _bufferGameMapArr, gameIdMap: _bufferGameIdMapArr});
    this.createBox(1);
  }

  slipToTop(){
    let _bufferGameMapArr = this.state.gameMap;
    let _bufferGameIdMapArr = this.state.gameIdMap;
    let _currentIndexBuffer = 0;
    for(let row = 0; row < this.rowSize; row++){
      for(let col = 0; col < this.colSize; col++){
        _currentIndexBuffer = 0;
        if(_bufferGameMapArr[this.getId(row, col)] != 0){
          for(let bufferIndexNumber = row; bufferIndexNumber > _currentIndexBuffer; bufferIndexNumber--){
            if(_bufferGameMapArr[this.getId(bufferIndexNumber, col)] == _bufferGameMapArr[this.getId(bufferIndexNumber - 1, col)]){
              //gameMapArr
              _bufferGameMapArr[this.getId(bufferIndexNumber - 1, col)] = _bufferGameMapArr[this.getId(bufferIndexNumber - 1, col)] + _bufferGameMapArr[this.getId(bufferIndexNumber, col)];
              _bufferGameMapArr[this.getId(bufferIndexNumber, col)] = 0;
             
              //gameIdMapArr
              this.removedData.push(_bufferGameIdMapArr[this.getId(bufferIndexNumber - 1, col)]);
              _bufferGameIdMapArr[this.getId(bufferIndexNumber - 1, col)] = _bufferGameIdMapArr[this.getId(bufferIndexNumber, col)];
              _bufferGameIdMapArr[this.getId(bufferIndexNumber, col)] = 0;

              _currentIndexBuffer++;
            }else if((_bufferGameMapArr[this.getId(bufferIndexNumber, col)] != _bufferGameMapArr[this.getId(bufferIndexNumber - 1, col)]) && (_bufferGameMapArr[this.getId(bufferIndexNumber - 1, col)] != 0)){
              _currentIndexBuffer++;
            }else if( _bufferGameMapArr[this.getId(bufferIndexNumber - 1, col)] == 0){
              //gameMapArr
              _bufferGameMapArr[this.getId(bufferIndexNumber - 1, col)] = _bufferGameMapArr[this.getId(bufferIndexNumber, col)];
              _bufferGameMapArr[this.getId(bufferIndexNumber, col)] = 0;
              //gameIdMapArr
              _bufferGameIdMapArr[this.getId(bufferIndexNumber - 1, col)] = _bufferGameIdMapArr[this.getId(bufferIndexNumber, col)];
              _bufferGameIdMapArr[this.getId(bufferIndexNumber, col)] = 0;
            }
          }
        }
      }
    }
    this.setState({gameMap: _bufferGameMapArr, gameIdMap: _bufferGameIdMapArr});
    this.createBox(1);
  }

  slipToBottom(){
    let _bufferGameMapArr = this.state.gameMap;
    let _bufferGameIdMapArr = this.state.gameIdMap;
    let _currentIndexBuffer = 3;
    for(let row = this.rowSize - 1; row >= 0; row--){
      for(let col = 0; col < this.rowSize; col++){
        _currentIndexBuffer = 3;  
        if(_bufferGameMapArr[this.getId(row, col)] != 0){
          for(let bufferIndexNumber = row; bufferIndexNumber < _currentIndexBuffer; bufferIndexNumber++){
            if(_bufferGameMapArr[this.getId(bufferIndexNumber, col)] == _bufferGameMapArr[this.getId(bufferIndexNumber + 1, col)]){
              //gameMapArr
              _bufferGameMapArr[this.getId(bufferIndexNumber + 1, col)] = _bufferGameMapArr[this.getId(bufferIndexNumber + 1, col)] + _bufferGameMapArr[this.getId(bufferIndexNumber, col)];
              _bufferGameMapArr[this.getId(bufferIndexNumber, col)] = 0;

              this.removedData.push(_bufferGameIdMapArr[this.getId(bufferIndexNumber + 1, col)]);
              _bufferGameIdMapArr[this.getId(bufferIndexNumber + 1, col)] = _bufferGameIdMapArr[this.getId(bufferIndexNumber, col)];
              _bufferGameIdMapArr[this.getId(bufferIndexNumber, col)] = 0;

              _currentIndexBuffer--;
            }else if((_bufferGameMapArr[this.getId(bufferIndexNumber, col)] != _bufferGameMapArr[this.getId(bufferIndexNumber + 1, col)]) && (_bufferGameMapArr[this.getId(bufferIndexNumber + 1, col)] != 0)){
              _currentIndexBuffer--;
            }else if( _bufferGameMapArr[this.getId(bufferIndexNumber + 1, col)] == 0){
              //gameMapArr
              _bufferGameMapArr[this.getId(bufferIndexNumber + 1, col)] = _bufferGameMapArr[this.getId(bufferIndexNumber, col)];
              _bufferGameMapArr[this.getId(bufferIndexNumber, col)] = 0;
              //gameIdMapArr
              _bufferGameIdMapArr[this.getId(bufferIndexNumber + 1, col)] = _bufferGameIdMapArr[this.getId(bufferIndexNumber, col)];
              _bufferGameIdMapArr[this.getId(bufferIndexNumber, col)] = 0;
            }
          }
        }
      }
    }
    this.setState({gameMap: _bufferGameMapArr, gameIdMap: _bufferGameIdMapArr});
    this.createBox(1);
  }
  
  render(){
    return(
      <div className="gameBox">
        {
          this.state.arr.map(
            (val, index) => {
              return(
                <GameRow key={index} id={index} value={val}/>
              )
            }
          )
        }
        {
          this.state.gameIdMap.map(
            (val, index) => {
              if(val != 0){
                return(
                  <GameNumber key={val} id={val} location={this.calculateLocation(this.getColAndRow(index).row, this.getColAndRow(index).col)} value={this.state.gameMap[index]}/>
                )
              }
            }
          )
          
        }
      </div>
    );
  }
}