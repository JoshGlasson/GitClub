import React, {Component} from 'react';

class Fixtures extends Component {
    render() {
        return (
            <div>
                <p>{this.props.item.fixture}</p>
                <p>{this.props.item.date}</p>
                <p>{this.props.item.location}</p>
            </div>
        );
    }
}

export default Fixtures;