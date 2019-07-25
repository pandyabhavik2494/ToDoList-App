import React from 'react';
import FlipMove from 'react-flip-move';
 
class TodoItems extends React.Component {
  constructor(props, context) {
    super(props, context);
 
    this.createTasks = this.createTasks.bind(this);
    this.delete = this.delete.bind(this);
    this.strike = this.strike.bind(this);
  }
  delete(key) {
    this.props.delete(key);
  }
  strike(item){
    if(item.statusText === "Done"){
      item.statusText = "Undo";
      item.status = true;
    }else{
      item.statusText = "Done";
      item.status = false;
    }
    this.props.strike(item);
  }
  createTasks(item) { 
    if(item.statusText !== "Undo"){
    item.statusText = "Done";
    }else{
    item.statusText = "Undo";
    }
    let priorityStyle = null;
    switch(item.priority) {
        case '1' : priorityStyle = {
                    backgroundColor : '#f00',
                    borderRadius: '15px'};
        break;
        case '2' : priorityStyle = {
                    backgroundColor : '#ffb266',
                    borderRadius: '15px'};
        break;
        case '3' : priorityStyle = {
                    backgroundColor : '#ff0',
                    borderRadius: '15px'};
        break;
        case '4' : priorityStyle = {
                    backgroundColor : '#008000',
                    borderRadius: '15px'};
        break;
        default : priorityStyle = null;
    }
    return <div key={item.key}>
      <div className="col-sm-8">
                <div className={item.status ? 'theDoneList' : ''} style={priorityStyle}>
                    <li>{item.taskName}</li>
                </div>
            </div>
            <div className="col-sm-4">
                <button className="doneButton" onClick={(e) => this.strike(item,e)} type="button">{item.statusText}</button>
                <button type="button" onClick={(e) => this.delete(item.key, e)} className="removeButton">
                    <span className="glyphicon glyphicon-remove"></span>Remove
                </button>

            </div>
        </div>
}
 
  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);
 
    return (
      <ul className="theList">
      <FlipMove duration={250} easing="ease-out">
          {listItems}
      </FlipMove>
      </ul>

    );
  }
};
 
export default TodoItems;