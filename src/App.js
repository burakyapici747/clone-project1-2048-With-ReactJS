import React from 'react';
import './App.css';
import GameBox from './components/GameBox';

export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
      return(
          <div className="container ">
              <GameBox/>
          </div>
      );
  }
}