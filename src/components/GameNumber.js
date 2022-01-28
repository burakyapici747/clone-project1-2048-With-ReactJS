import React from "react";
export default class GameNumber extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className={`gameNumber ${'gameNumber'+this.props.value}`} style={{left: `${this.props.location(this.props.col, this.props.row)[0]}px`, top: `${this.props.location(this.props.row, this.props.row)[1]}px`}}>
                <span className={`number number${this.props.value}`}>{this.props.value}</span>
            </div>
        );
    }
}