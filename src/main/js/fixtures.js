import React, {Component} from 'react';
import AddResult from './addResult';

class Fixtures extends Component {
constructor(props){
    super(props);
    this.state = {fixtureid: this.props.item._links.self.href.split("/")[this.props.item._links.self.href.split("/").length-1], showComponent:false, role: document.getElementById("role").value, };
    this.deleteFixture = this.deleteFixture.bind(this);
    this.addResult = this.addResult.bind(this);
    this.prettyDate = this.prettyDate.bind(this);
    this.prettyTime = this.prettyTime.bind(this);
    this.cancelAddResult = this.cancelAddResult.bind(this);

}

    render() {

    if(this.state.role === 'manager'){
    return (
            <tbody>
              <td>{this.props.item.fixture}</td>
              <td>{this.prettyDate(this.props.item.date)}</td>
              <td>{(this.props.item.result === null ? this.prettyTime(this.props.item.date) : this.props.item.result)}</td>
              <td>{this.props.item.location}</td>
              <td>{this.state.showComponent ?  <div><AddResult item={this.state.fixtureid}/><button type="button" class="btn btn-danger form-inline btn-sm" onClick={this.cancelAddResult}>Cancel</button></div> : <button type="button" class="btn btn-success" onClick={this.addResult}>Add Result</button>}</td>
              <td><button class="btn btn-danger" onClick={this.deleteFixture}>Delete</button></td>
            </tbody>
             )
    } else {
    return (
            <tbody>
              <td>{this.props.item.fixture}</td>
              <td>{this.prettyDate(this.props.item.date)}</td>
              <td>{(this.props.item.result === null ? this.prettyTime(this.props.item.date) : this.props.item.result)}</td>
              <td>{this.props.item.location}</td>
            </tbody>
             )
    }



    };



    prettyDate(value){
       var monthNames = [
           "January", "February", "March",
           "April", "May", "June", "July",
           "August", "September", "October",
           "November", "December"
        ];

        var fulldate = new Date(value)
        var day = (fulldate.getDate() > 9 ? fulldate.getDate() : '0'+fulldate.getDate())
        var month = fulldate.getMonth()
        var year = fulldate.getFullYear()
        return (day+"-"+monthNames[month]+"-"+year)
    }


    prettyTime(value){
        var fulldate = new Date(value)
        var hour = (fulldate.getHours() > 9 ? fulldate.getHours() : '0' + fulldate.getHours())
        var minutes = (fulldate.getMinutes() > 9 ? fulldate.getMinutes() : '0' + fulldate.getMinutes())
        var seconds = (fulldate.getSeconds() > 9 ? fulldate.getSeconds() : '0' + fulldate.getSeconds())
        return (hour+":"+minutes+":"+seconds)
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
            this.setState({showComponent:true})

         }

         cancelAddResult(){
                     this.setState({showComponent:false})

                  }
}

export default Fixtures;