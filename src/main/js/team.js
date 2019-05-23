import React, {Component} from 'react';

class Team extends Component {
constructor(props){
    super(props);
    this.state = {userid: this.props.item._links.self.href.split("/")[this.props.item._links.self.href.split("/").length-1], role: document.getElementById("role").value, };
    this.deletePlayer = this.deletePlayer.bind(this);
    this.capitalise = this.capitalise.bind(this);

    }

    render() {

    if(this.state.role === 'manager'){
    return (
        <tbody>
          <td>{this.capitalise(this.props.item.name)}</td>
          <td>{this.capitalise(this.props.item.position)}</td>
          <td><button type="button" class="btn btn-danger" onClick={this.deletePlayer} >Delete</button></td>
        </tbody>
    )
    } else {
    return (
        <tbody>
          <td>{this.capitalise(this.props.item.name)}</td>
          <td>{this.capitalise(this.props.item.position)}</td>
        </tbody>
    )
    }

    }

    deletePlayer(){
     console.log("Pre Fetch")
                   fetch('/api/availabilities/search/deleteByUserid?userid='+ this.state.userid).then(
                   fetch('/api/users/'+ this.state.userid, {
                                   method: 'DELETE',
                                   headers: {
                                     'Accept': 'application/json',
                                     'Content-Type': 'application/json',
                                   },
                                 }))
               };

     capitalise(string) {
         return string.charAt(0).toUpperCase() + string.slice(1);
     }
}


export default Team;