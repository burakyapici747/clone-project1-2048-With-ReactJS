import React from "react";
import GameCell from "./GameCell";

export default class GameRow extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="gameRow" id={this.props.id}>
                {
                    this.props.value.map(
                        (element, index) => {
                            return(
                                <GameCell key={index} value={element} id={this.props.id + "-" + index}/>
                            );
                        }
                    )
                }
            </div>
        );
    }
}