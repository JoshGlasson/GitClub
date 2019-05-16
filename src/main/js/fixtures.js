import React, {Component} from 'react';
import AddResult from './addResult';

class Fixtures extends Component {
constructor(props){
    super(props);
    this.state = {fixtureid: this.props.item._links.self.href.split("/")[this.props.item._links.self.href.split("/").length-1], showCompnent:false };
    this.deleteFixture = this.deleteFixture.bind(this);
    this.addResult = this.addResult.bind(this);
    }
    render() {
        return (
            <div>

                 <p>| {this.props.item.fixture} | {this.props.item.date.substring(0,10)} | {this.props.item.location} | {(this.props.item.result === null ? this.props.item.date.substring(11,19) : this.props.item.result)} | <button type="button" class="btn btn-primary" onClick={this.deleteFixture} >Delete</button>
                 <button type="button" class="btn btn-primary" onClick={this.addResult} >Add Result</button></p>
                 {this.state.showCompnent ?  <AddResult item={this.state.fixtureid}/> : null}

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

         addResult(){
            this.setState({showCompnent:true})

         }
}

export default Fixtures;