/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class Todolist extends Component {
    constructor(){
        super();
        this.state = {
            todolist : [],
            conedit : false
        }
        this.textval = React.createRef()
    }
    componentDidMount() {
    }

    todoComplete = (i, event) => {
        if(event.target.checked)
            this.props.todoList[i].isCompleted = true;
        else
            this.props.todoList[i].isCompleted = true;
    }
    ontextEdit(event, item) {
        if(event.target.innerText === "Edit"){
            event.target.innerText = "Update";
            this.setState({conedit:true});
        }
        else if(event.target.innerText === "Update"){
            this.props.onEdit(this.textval.current.innerText, item.id);
            event.target.innerText = "Edit";
        } 
    }

    render() {
        const { todoList, header, onTodoToggle, onDelete } = this.props;
        return (
            <div>
                <h3>{header}</h3>
                {todoList.map((item, index) => (
                    <div key={index}>
                            <span><input type="checkbox"  onChange={(e) => onTodoToggle(item)}/></span>
                            <span contentEditable={this.state.conedit} suppressContentEditableWarning={true} ref={this.textval}>{item.name}
                            </span>&nbsp;
                            
                            <span onClick={(e) => { this.ontextEdit(e, item) }}>Edit</span> &nbsp;
                            <span onClick={ () => { onDelete(item) }}>Delete</span>
                    </div>
                ))}
            </div>
        );
    }
}

export default Todolist;
