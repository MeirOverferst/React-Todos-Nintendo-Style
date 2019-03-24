import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  Container,
  Button,
  Radios,
  Checkbox,
  TextInput,
  TextArea,
  Avatar,
  Balloon,
  List,
  Table,
  Progress,
  Icon,
  Sprite,
  ControllerIcon
} from "nes-react";

class App extends Component {
  constructor(props) {
    super(props);
    this.addTask = this.addTask.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.setDone = this.setDone.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.removeAlert = this.removeAlert.bind(this);
    this.state = { inputVal: '', tasks: [], isDuplicate: false, showErrorLength: false };
}

updateValue(event) {
    this.setState({ inputVal: event.target.value });
}

addTask(event) {
    event.preventDefault();
    const temporary = [...this.state.tasks];

    // check if task is not empty string
    if (!this.state.inputVal.length) {
        this.setState({ showErrorLength: true, isDuplicate: false });
        return false;
    }

    // check if task already exists
    if (temporary.includes(this.state.inputVal)) {
        this.setState({ isDuplicate: true, showErrorLength: false });
        return false;
    }

    temporary.push(this.state.inputVal);
    this.setState({ tasks: temporary, inputVal: '', isDuplicate: false });
}

setDone(event) {
    event.target.parentElement.classList.toggle('strike');
    ;
}

deleteTask(event) {
    const parentOfDeleteButton = event.target.parentElement; // the li element of the clicked button
    const parentText = parentOfDeleteButton.getAttribute('text'); // 'ruby'
    const tempTasks = [...this.state.tasks];
    delete tempTasks[tempTasks.indexOf(parentText)];
    this.setState({ tasks: tempTasks });
}

removeAlert(event) {
    this.setState({ isDuplicate: false, showErrorLength: false });
}
render() {

    return (
        <React.Fragment>
        <Container> 
            <form onSubmit={this.addTask} >
                
                    <div>
                    <i className="nes-mario"></i> <span className="input-group-text">Write a task</span>
                    </div>
                    <button style={{width:"17.5vw"}}  type="submit" className="nes-btn is-success">Add a task</button>
                    <input style={{width:"70vw"}} type="text" className="nes-textarea" onChange={this.updateValue} value={this.state.inputVal} />
                
            </form>
            </Container>

            {this.state.isDuplicate && <div >Failure! Task has been already defined!<span onClick={this.removeAlert} className="nes-icon close"></span></div>}
            {this.state.showErrorLength && <div >Attention! Write something <span onClick={this.removeAlert} className="nes-icon close"></span></div>}
            <div >

                <TransitionGroup component="ul" className="list group">
                    {this.state.tasks.map((taskDescription, index) => {
                        return (

                            <CSSTransition key={index} timeout={500} classNames="bouncer">
                                <React.Fragment>
                                
                                    {taskDescription && <div text={taskDescription} className="nes-container is-rounded" >{taskDescription}

                                    <button style={{float: 'right',bottom:"0.85em",left:"1.65em"}} onClick={this.deleteTask} className="nes-btn is-error">Delete task</button>
                                      <button style={{float: 'right',bottom:"0.85em",left:"1.65em"}} onClick={this.setDone} className="nes-btn is-success">Set to Done</button>
                                       
                                        
                                        </div>
                                  
                            
                                  }
                                </React.Fragment>
                            </CSSTransition>

                        )
                    })
                    }
                </TransitionGroup>
            </div>

        </React.Fragment>
    )
}
}

export default App;
