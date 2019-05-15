import React, {Component} from 'react';

class Fixtures extends Component {
    render() {
        return (
            <div>


                 <p>| {this.props.item.fixture} | {this.props.item.date} | {this.props.item.location} |</p>



            </div
        );
    }
}

export default Fixtures;