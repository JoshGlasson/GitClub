import React, {Component} from 'react';

class GetTeamSheet extends Component {
constructor(props){
    super(props);
    this.state = {player: null};

    fetch('/api/users/'+ this.props.item.userid, {
                                 method: 'GET',
                                 headers: {
                                 'Content-Type': 'application/json',
                                 },
                                 credentials: 'same-origin'
                                 }).then((response) => {
                                      if(response.ok) {
                                        return response.json();
                                      } else {
                                        throw new Error('Server response wasn\'t OK');
                                      }
                                    })
                                    .then((json) => {
                                    this.setState({player: json.name})
                                 });
}

    render() {
        return (
        <tbody>
          <td>{this.state.player}</td>
        </tbody>
         )
    };

}

export default GetTeamSheet;