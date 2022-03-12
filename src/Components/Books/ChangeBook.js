import React , {Component} from 'react';
//import changeBook from './App.js'


class ChangeBook extends Component {

  
 handelShelfValue(event){
    console.log(event.target.value,this.props.bookId);
  this.props.changeBook(this.props.bookId, event.target.value);
  this.props.changeSearchBook(this.props.bookId, event.target.value , this.props.book);
    }
  
  render(){
    
  return(  
    <div className="book-shelf-changer">
      <select id="selectValue" value={this.props.shelf} onChange={event => this.handelShelfValue(event)} >
        <option value="move" disabled >Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
		)
  
  }
      
    }
    
    export default ChangeBook