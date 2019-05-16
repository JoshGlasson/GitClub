import React, {Component} from 'react';

class Fixtures extends Component {
constructor(props){
    super(props);
    this.state = {fixtureid: this.props.item._links.self.href.split("/")[this.props.item._links.self.href.split("/").length-1] };
    this.deleteFixture = this.deleteFixture.bind(this);
    }
    render() {
        return (
            <div>

                 <p>| {this.props.item.fixture} | {this.props.item.date} | {this.props.item.location} | <button type="button" class="btn btn-primary" onClick={this.deleteFixture} >Delete</button></p>

            </div>
        );
    }

        deleteFixture(){
         console.log("Pre Fetch")
                       fetch('/api/fixtureses/'+ this.state.fixtureid, {
                                       method: 'DELETE',
                                       headers: {
                                         'Accept': 'application/json',
                                         'Content-Type': 'application/json',
                                       },
                                     })
                                     location.href = self.location.href;



                   };
}

export default Fixtures;