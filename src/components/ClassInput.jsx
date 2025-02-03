/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
      count: 2,
      triggerEdit: true,
      editInputValue: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCount= this.handleCount.bind(this);
    this.handleEdit= this.handleEdit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
    this.handleCount()
  }

  handleDelete(e) {
    this.setState((state) => ({
    todos: state.todos.filter(task => task !== e.target.previousSibling.data),
  }));
  this.handleCount()
  };

  handleCount() {
    this.setState((state) => ({
    count: state.todos.length
    }))
  }

  handleEdit(e) {
    console.log(e.target)
    // Maybe a conditional?
    this.setState((state) => ({
      ...state,
      triggerEdit: !(this.state.triggerEdit),
      editInputValue: this.state.todos,
    }));
  }


  render() {
    console.log(this.state.count)
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <h4>Count: {this.state.count}</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            this.state.triggerEdit ? (
            <li key={todo}>{todo}
            <button onClick={this.handleEdit} type={this.state.triggerEdit ? 'edit' : 'resubmit'}>{this.state.triggerEdit ? 'Edit' : 'Resubmit'}</button>
            <button onClick={this.handleDelete} type="delete">Delete</button>
            </li>
            ) : (
            <li>
              <input type="text" name="task-edit" value={todo} />
              <button onClick={this.handleEdit} type={this.state.triggerEdit ? 'edit' : 'resubmit'}>{this.state.triggerEdit ? 'Edit' : 'Resubmit'}</button>
              <button onClick={this.handleDelete} type="delete">Delete</button>
            </li>
          )  
          ))}
        </ul>
        
      </section>
    );
  }
}

export default ClassInput;
