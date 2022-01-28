import React from 'react';
import './App.css';
import GameBox from './components/GameBox';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      gameMap: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    };
  }

  render(){
      return(
          <div className="container">
              <GameBox gameStateMap={this.state.gameMap}/>
          </div>
      );
  }
}