import React  from 'react';
import TodoItems from './TodoItems';
import './TodoList.css';
import {Alert} from 'react-bootstrap';

class MainContent extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <TodoList/>
                <Footer/>
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div id="todoHeader">
                <span id="headerTitle">ToDoREACT</span>
            </div>
        );
    }
}

class TodoList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            items: [],
            alertVisible:false
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.strikeItem = this.strikeItem.bind(this);
        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    }


    addItem(e) {
        if (this._selectElement.value < 1) {
            //alert("Please Set Priority For The Task.");
            this.setState({alertVisible:true});
        }
        if (this._selectElement.value > 0) {
            var itemArray = this.state.items;
            var item;

            item = {
                priority: this._selectElement.value,
                key: Date.now(),
                taskName: this._inputElement.value
            }
        }

        if (this._inputElement.value !== "" && this._selectElement.value > 0) {
            itemArray.push(item);
            itemArray.sort(function (task1, task2) {
                return task1.priority - task2.priority
            });
            this.setState({
                items: itemArray
            });

            this._inputElement.value = '';
            this._selectElement.value = '';
            this.setState({alertVisible:false});
        }

        //console.log(itemArray);

        e.preventDefault();

    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
        });

        this.setState({
            items: filteredItems
        });
    }

    strikeItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
        });

        this.setState({
            items: filteredItems,
        });
    }

    handleAlertDismiss() {
        this.setState({ alertVisible: false });
    }

    render() {
        let alert = null;
        if(this.state.alertVisible) {
            alert = <Alert bsStyle="danger" className="alertCss" onDismiss={this.handleAlertDismiss}><p>Please set the priority</p></Alert>;
        } else {
            alert = null;
        }
        return (
            <div className="container-fluid">
                <div className={['row', 'pageColor'].join(' ')}>
                    <div className="col-sm-4" id="addContent">
                        {alert}
                        <form onSubmit={this.addItem}>
                            <div className="row">
                                <input className="input" ref={(a) => this._inputElement = a}
                                       placeholder="What's on your mind ?"/>
                                <select ref={(a) => this._selectElement = a}>
                                    <option value="">Select Priority</option>
                                    <option value="1">Critical</option>
                                    <option value="2">High</option>
                                    <option value="3">Medium</option>
                                    <option value="4">Low</option>
                                </select>
                                <button id="addButton" type="submit">Add</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-8" id="todoContent">
                        <div className="row">
                            <TodoItems entries={this.state.items} delete={this.deleteItem} strike={this.strikeItem}/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

class Footer extends React.Component {
    render() {
        return (
            <div id="todoFooter">
                <span id="footerContent">ReactApplication&copy;2019</span>
            </div>
        );
    }
}

export default MainContent;