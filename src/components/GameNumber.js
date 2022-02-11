import React from "react";
export default class GameNumber extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div id={this.props.id} style={{left: `${this.props.location.left}px`, top: `${this.props.location.top}px`}} className={`gameNumber gameNumber${this.props.val}`}>
                <span className={`number number${this.props.val}`}>{this.props.val}</span>
            </div>
        );
    }
}