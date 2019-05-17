const React = require('react');
const ReactDOM = require('react-dom');
import './availabilityTable.css';
import { MDBInput, MDBFormInline } from 'mdbreact';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './react-bootstrap-table-all.min.css';


class Table extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         players: [
            { name: 'Phil', availability: 'Test' },
            { name: 'Josh', availability: 'Test'},
            { name: 'Sol', availability: 'Test'},
            { name: 'Sean', availability: 'Test'}
         ]
      }
   }

   renderTableHeader() {
      let header = Object.keys(this.state.players[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   renderTableData() {
      return this.state.players.map((player, index) => {
         const { name, availability} = player //destructuring
         return (
            <tr key={name, availability}>
               <td>{name}</td>
               <td><input type="checkbox" class="form-check-input" name="training" name="Training" value="Training"></input></td>
            </tr>
         )
      })
   }

   render() {
      return (
         <div>
            <h1 id='title'> Team Availability</h1>
            <table id='players'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}

               </tbody>
            </table>
         </div>
      )
   }
}

ReactDOM.render(<Table />, document.getElementById('availability'));


