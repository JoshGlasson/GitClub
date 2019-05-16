import React, {Component} from 'react';

class Team extends Component {
    render() {
        return (
            <div>

                 <p>| {this.props.item.name} | {this.props.item.position} |</p>


            </div>
        );


    }
}

export default Team;