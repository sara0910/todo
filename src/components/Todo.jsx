import React, { Component, Fragment } from 'react';
import Todolist from './Todolist';
class Todo extends Component {
    constructor() {
        super();
        this.state = {
            inputTodo: '',
            addedValues: []
        };
        this.inputTodoRef = React.createRef();
        this.inc = 0;
    }

    addData = () => {
        this.inc++;
        const { addedValues} = this.state;
        const { current: { value }} = this.inputTodoRef;
        this.setState({ addedValues: [ ...addedValues, {id: this.inc, name: value, isCompleted: false }] });
        this.inputTodoRef.current.value = "";
    }

    handleTodoToggle = (item) => {
        const { addedValues } = this.state;
        this.setState({ addedValues: addedValues.map(t => item.id === t.id ? { ...t, isCompleted: !t.isCompleted } : t)});
    }

    handleDelete = (item) => {
        const { addedValues } = this.state;
        this.setState({ addedValues: addedValues.filter(t => t.id !== item.id )})
    }
    handleEdit = (text, id) => {
        const { addedValues } = this.state;
        this.setState({ addedValues : addedValues.map(t => id === t.id ? { ...t, name: text } : t)});
    }
    componentDidUpdate() {
    }

    render() {
        const { addedValues } = this.state;
        return (
            <Fragment>
                <div className="todo-container">
                    <div className="action-wrap">
                        <input type="text" onChange={this.handleOnChange} ref={this.inputTodoRef} />
                        <button type="button" className="addBtn" onClick={this.addData}>Add</button>
                        
                        <Todolist todoList={addedValues.filter(t => !t.isCompleted)} header="Pending" onTodoToggle={this.handleTodoToggle} onDelete={this.handleDelete} onEdit={this.handleEdit}/>
                        <Todolist todoList={addedValues.filter(t => t.isCompleted)} header="Completed" onTodoToggle={this.handleTodoToggle} onDelete={this.handleDelete} onEdit={this.handleEdit}/>
                    </div>
                </div>
            </Fragment>
        );
    }

    
}
export default Todo;
