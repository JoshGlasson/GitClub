import React, {Component} from 'react';

class Team extends Component {
constructor(props){
    super(props);
    this.state = {userid: this.props.item._links.self.href.split("/")[this.props.item._links.self.href.split("/").length-1] };
    this.deletePlayer = this.deletePlayer.bind(this);
    }

    render() {
        return (
            <div>
                 <p>| {this.props.item.name} | {this.props.item.position} {this.props.id}|</p>
               <a href="/viewTeam"><button type="button" class="btn btn-primary" onClick={this.deletePlayer} >Delete</button></a>
                   {console.log(this.state.userid)}
            </div>
        );


    }

    deletePlayer(){
     console.log("Pre Fetch")
                   fetch('/api/users/'+ this.state.userid, {
                                   method: 'DELETE',
                                   headers: {
                                     'Accept': 'application/json',
                                     'Content-Type': 'application/json',
                                   },
                                 })
               };
}


export default Team;