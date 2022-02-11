import React from "react";
import GameRow from "./GameRow";
import GameNumber from "./GameNumber";
export default class GameBox extends React.Component{

  constructor(props){
      super(props);
      this.state = {
        gameMap: [
          [0, 0, 0, 0],
          [0, 0, 2, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        gameIdMap: [
          [0, 0, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        gameNextValue: 1,
      }
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.removedData = [];
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

  createRandomForBoxNumber(){//Problem yok calisiyor
    let randomRow = 0, randomCol = 0;
    let newArrForGameMap = this.state.gameMap;
    let newArrForGameIdMap = this.state.gameIdMap;
    while(!this.gameMapIsFull()){
      randomRow = Math.floor(Math.random() * this.state.gameMap.length);
      randomCol = Math.floor(Math.random() * this.state.gameMap[0].length);
      if(this.isThatSlotEmpty(randomRow, randomCol)){
        newArrForGameMap[randomRow][randomCol] = this.createRandomForNumber();
        if(this.removedData.length > 0){
          newArrForGameIdMap[randomRow][randomCol] = this.removedData.shift();
        }else{
          newArrForGameIdMap[randomRow][randomCol] = this.state.gameNextValue++;
        }
        break;
      }
    }
    this.setState({gameMap: newArrForGameMap, gameIdMap: newArrForGameIdMap});
  }

  gameMapIsFull(){//Problem yok calisiyor
    for(let row = 0; row < this.state.gameMap.length; row++){
      for(let col = 0; col < this.state.gameMap[0].length; col++){
        if(this.state.gameMap[row][col] == 0){
          return false;
        }
      }
    }
    return true;
  }

  isThatSlotEmpty(row, col){//Problem yok calisiyor
    if(this.state.gameMap[row][col] == 0){
      return true;
    }else{
      return false;
    }
  }

  createRandomForNumber(numberOptions = {numbers: [2, 4], percent: [90, 10]}){//Problem yok calisiyor
    let randomForPercent = Math.floor(Math.random() * (100 - 1) ) + 1;
    let _randomForPercentBuffer = 0;
    for(let i = 0; i < numberOptions.percent.length; i++){
      if( (randomForPercent >= _randomForPercentBuffer)  && (randomForPercent <= (_randomForPercentBuffer + numberOptions.percent[i])) ){
        return numberOptions.numbers[i];
      }
      _randomForPercentBuffer += numberOptions.percent[i];
    }
  }

  calculateLocation(row, col){//Düzeltmeler yapılacak!!!!!!!!!!!!
    let location = {
      top: ((row * 106.25) + (row+1) * 15),
      left: ((col * 106.25) + (col+1) * 15),
    }
    return location;
  }

  getValue(){
    return this.state.gameMap
  }

  slipToRight(){
    let _bufferGameMapArr = this.state.gameMap;
    let _bufferGameIdMapArr = this.state.gameIdMap;
    let _currentIndexBuffer = 3;
    for(let row = 0; row < _bufferGameMapArr.length; row++){
      _currentIndexBuffer = 3;
      for(let col = _bufferGameMapArr.length - 2; col >= 0; col--){
        if(_bufferGameMapArr[row][col] != 0){
          for(let bufferIndexNumber = col; bufferIndexNumber < _currentIndexBuffer; bufferIndexNumber++){
            if(_bufferGameMapArr[row][bufferIndexNumber] == _bufferGameMapArr[row][bufferIndexNumber + 1]){
              //gameMapArr
              _bufferGameMapArr[row][bufferIndexNumber + 1] = _bufferGameMapArr[row][bufferIndexNumber + 1] + _bufferGameMapArr[row][bufferIndexNumber];
              _bufferGameMapArr[row][bufferIndexNumber] = 0;
              
              //gameIdMapArr
              this.removedData.push(_bufferGameIdMapArr[row][bufferIndexNumber + 1]);
              _bufferGameIdMapArr[row][bufferIndexNumber + 1] = _bufferGameIdMapArr[row][bufferIndexNumber];
              _bufferGameIdMapArr[row][bufferIndexNumber] = 0;

              _currentIndexBuffer--;
            }else if((_bufferGameMapArr[row][bufferIndexNumber] != _bufferGameMapArr[row][bufferIndexNumber + 1]) && (_bufferGameMapArr[row][bufferIndexNumber + 1] != 0)){
              _currentIndexBuffer--;
            }else if( _bufferGameMapArr[row][bufferIndexNumber + 1] == 0){
              //gameMapArr
              _bufferGameMapArr[row][bufferIndexNumber + 1] = _bufferGameMapArr[row][bufferIndexNumber];
              _bufferGameMapArr[row][bufferIndexNumber] = 0;
              //gameIdMapArr
              _bufferGameIdMapArr[row][bufferIndexNumber + 1] = _bufferGameIdMapArr[row][bufferIndexNumber];
              _bufferGameIdMapArr[row][bufferIndexNumber] = 0;
            }
          }
        }
      }
    }
    this.setState({gameMap: _bufferGameMapArr, gameIdMap: _bufferGameIdMapArr});
    //this.createBox(1);
  }

  slipToLeft(){
    let _bufferGameMapArr = this.state.gameMap;
    let _bufferGameIdMapArr = this.state.gameIdMap;
    let _currentIndexBuffer = 0;
    for(let row = 0; row < _bufferGameMapArr.length; row++){
      _currentIndexBuffer = 0;
      for(let col = 1; col < _bufferGameMapArr.length; col++){
        if(_bufferGameMapArr[row][col] != 0){
          for(let bufferIndexNumber = col; bufferIndexNumber > _currentIndexBuffer; bufferIndexNumber--){
            if(_bufferGameMapArr[row][bufferIndexNumber] == _bufferGameMapArr[row][bufferIndexNumber - 1]){

              //gameMapArr
              _bufferGameMapArr[row][bufferIndexNumber - 1] = _bufferGameMapArr[row][bufferIndexNumber - 1] + _bufferGameMapArr[row][bufferIndexNumber];
              _bufferGameMapArr[row][bufferIndexNumber] = 0;
              
              //gameIdMapArr
              this.removedData.push(_bufferGameIdMapArr[row][bufferIndexNumber - 1]);
              _bufferGameIdMapArr[row][bufferIndexNumber - 1] = _bufferGameIdMapArr[row][bufferIndexNumber];
              _bufferGameIdMapArr[row][bufferIndexNumber] = 0;


              _currentIndexBuffer++;
            }else if((_bufferGameMapArr[row][bufferIndexNumber] != _bufferGameMapArr[row][bufferIndexNumber - 1]) && (_bufferGameMapArr[row][bufferIndexNumber - 1] != 0)){
              _currentIndexBuffer++;
            }else if( _bufferGameMapArr[row][bufferIndexNumber - 1] == 0){
              //gameMapArr
              _bufferGameMapArr[row][bufferIndexNumber - 1] = _bufferGameMapArr[row][bufferIndexNumber];
              _bufferGameMapArr[row][bufferIndexNumber] = 0;
              //gameIdMapArr
              _bufferGameIdMapArr[row][bufferIndexNumber - 1] = _bufferGameIdMapArr[row][bufferIndexNumber];
              _bufferGameIdMapArr[row][bufferIndexNumber] = 0;
            }
          }
        }
      }
    }
    this.setState({gameMap: _bufferGameMapArr, gameIdMap: _bufferGameIdMapArr});
    //this.createBox(1);
  }

  slipToTop(){
    let _bufferGameMapArr = this.state.gameMap;
    let _bufferGameIdMapArr = this.state.gameIdMap;
    let _currentIndexBuffer = 0;
    for(let row = 0; row < _bufferGameMapArr.length; row++){
      for(let col = 0; col < _bufferGameMapArr.length; col++){
        _currentIndexBuffer = 0;
        if(_bufferGameMapArr[row][col] != 0){
          for(let bufferIndexNumber = row; bufferIndexNumber > _currentIndexBuffer; bufferIndexNumber--){
            if(_bufferGameMapArr[bufferIndexNumber][col] == _bufferGameMapArr[bufferIndexNumber - 1][col]){
              //gameMapArr
              _bufferGameMapArr[bufferIndexNumber - 1][col] = _bufferGameMapArr[bufferIndexNumber - 1][col] + _bufferGameMapArr[bufferIndexNumber][col];
              _bufferGameMapArr[bufferIndexNumber][col] = 0;
             
             
              //gameIdMapArr
              this.removedData.push(_bufferGameIdMapArr[bufferIndexNumber - 1][col]);
              _bufferGameIdMapArr[bufferIndexNumber - 1][col] = _bufferGameIdMapArr[bufferIndexNumber][col];
              _bufferGameIdMapArr[bufferIndexNumber][col] = 0;

              _currentIndexBuffer++;
              this.setState({gameMap: _bufferGameMapArr, gameIdMap: _bufferGameIdMapArr});
            }else if((_bufferGameMapArr[bufferIndexNumber][col] != _bufferGameMapArr[bufferIndexNumber - 1][col]) && (_bufferGameMapArr[bufferIndexNumber - 1][col] != 0)){
              _currentIndexBuffer++;
            }else if( _bufferGameMapArr[bufferIndexNumber - 1][col] == 0){
              //gameMapArr
              _bufferGameMapArr[bufferIndexNumber - 1][col] = _bufferGameMapArr[bufferIndexNumber][col];
              _bufferGameMapArr[bufferIndexNumber][col] = 0;
              //gameIdMapArr
              _bufferGameIdMapArr[bufferIndexNumber - 1][col] = _bufferGameIdMapArr[bufferIndexNumber][col];
              _bufferGameIdMapArr[bufferIndexNumber][col] = 0;
            }
          }
        }
      }
    }
    this.setState({gameMap: _bufferGameMapArr, gameIdMap: _bufferGameIdMapArr});
    //this.createBox(1);
  }

  slipToBottom(){
    let _bufferGameMapArr = this.state.gameMap;
    let _bufferGameIdMapArr = this.state.gameIdMap;
    let _currentIndexBuffer = 3;
    for(let row = _bufferGameMapArr.length - 1; row >= 0; row--){
      for(let col = 0; col < _bufferGameMapArr.length; col++){
        _currentIndexBuffer = 3;
        if(_bufferGameMapArr[row][col] != 0){
          for(let bufferIndexNumber = row; bufferIndexNumber < _currentIndexBuffer; bufferIndexNumber++){
            if(_bufferGameMapArr[bufferIndexNumber][col] == _bufferGameMapArr[bufferIndexNumber + 1][col]){
              //gameMapArr
              _bufferGameMapArr[bufferIndexNumber + 1][col] = _bufferGameMapArr[bufferIndexNumber + 1][col] + _bufferGameMapArr[bufferIndexNumber][col];
              _bufferGameMapArr[bufferIndexNumber][col] = 0;
             

              this.removedData.push(_bufferGameIdMapArr[bufferIndexNumber + 1][col]);
              _bufferGameIdMapArr[bufferIndexNumber + 1][col] = _bufferGameIdMapArr[bufferIndexNumber][col];
              _bufferGameIdMapArr[bufferIndexNumber][col] = 0;

              _currentIndexBuffer--;
            }else if((_bufferGameMapArr[bufferIndexNumber][col] != _bufferGameMapArr[bufferIndexNumber + 1][col]) && (_bufferGameMapArr[bufferIndexNumber + 1][col] != 0)){
              _currentIndexBuffer--;
            }else if( _bufferGameMapArr[bufferIndexNumber + 1][col] == 0){
              //gameMapArr
              _bufferGameMapArr[bufferIndexNumber + 1][col] = _bufferGameMapArr[bufferIndexNumber][col];
              _bufferGameMapArr[bufferIndexNumber][col] = 0;
              //gameIdMapArr
              _bufferGameIdMapArr[bufferIndexNumber + 1][col] = _bufferGameIdMapArr[bufferIndexNumber][col];
              _bufferGameIdMapArr[bufferIndexNumber][col] = 0;
            }
          }
        }
      }
    }
    this.setState({gameMap: _bufferGameMapArr, gameIdMap: _bufferGameIdMapArr});
    //this.createBox(1);
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
        {
          this.state.gameIdMap.map(            
            (row, rowKey) => {
              return(
                row.map(
                  (col, colKey) =>{
                    if(row[colKey] != 0){
                      return(
                        <GameNumber key={this.state.gameIdMap[rowKey][colKey]} id={this.state.gameIdMap[rowKey][colKey]} location={this.calculateLocation(rowKey, colKey)} val={this.getValue()[rowKey][colKey]}/>
                      )
                    }
                  }
                )
              )
            }
          )
        }
      </div>
    );
  }
}