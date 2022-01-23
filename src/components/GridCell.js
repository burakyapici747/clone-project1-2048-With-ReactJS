import React from 'react';
import './../App.css'

export default class GridCell extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={"gridCell gridCell-" + this.props.number}>
                <div className={"number number-" + this.props.number}>{(this.props.number != 0) ? this.props.number : "" }</div>      
            </div>
        );
    }
}