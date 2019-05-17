import React, {Component} from 'react';

class Fixtures extends Component {
constructor(props){
    super(props);
    this.prettyDate = this.prettyDate.bind(this);
    this.prettyTime = this.prettyTime.bind(this);
}

    render() {
        return (
            <div>
                <p>| {this.props.item.fixture} | {this.prettyDate(this.props.item.date)} | {this.props.item.location} | {this.prettyTime(this.props.item.date)} |</p>
            </div>
        );
    }

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
}

export default Fixtures;