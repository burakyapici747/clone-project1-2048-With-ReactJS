import GridCell from './GridCell';
import './../App.css'
import React from 'react';

export default class GridRow extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="gridRow">
                <GridCell number={this.props.gridrow[0]}/>
                <GridCell number={this.props.gridrow[1]}/>
                <GridCell number={this.props.gridrow[2]}/>
                <GridCell number={this.props.gridrow[3]}/>
            </div>
        );
    }
}