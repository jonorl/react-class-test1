import React, { Component } from 'react';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [{ text: 'Just some demo tasks', edit: true }, { text: 'As an example', edit: true }],
      inputVal: '',
      count: 2,
      editInputValue: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCount = this.handleCount.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleResubmit = this.handleResubmit.bind(this);
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
      todos: state.todos.concat({ text: state.inputVal, edit: true }),
      inputVal: '',
    }));
    this.handleCount()
  }

  handleDelete(e) {
    this.setState((state) => ({
      todos: state.todos.filter(task => task.text !== e.target.previousSibling.previousSibling.data),
    }));
    this.handleCount()
  };

  handleCount() {
    this.setState((state) => ({
      count: state.todos.length
    }))
  }

  handleEdit(e, todoText) {
    console.log(e.target)
    // Maybe a conditional?
    this.setState((state) => ({
      ...state,
      editInputValue: state.todos.text,
      todos: state.todos.map(todo =>
        todoText === todo.text
          ? { ...todo, edit: !todo.edit }
          : todo
      )
    }));
  }

  handleResubmit(e, indexedKey) {
    console.log(e.target.value)
    this.setState((state) => ({
      ...state,
      todos: state.todos.map((todo, index) =>
        index === indexedKey
          ? { ...todo, text: e.target.value }
          : todo
      ),
    }));
  }


  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
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
          {this.state.todos.map((todo, index) => (
            todo.edit ? (
              <li key={index}>{todo.text}
                <button onClick={(e) => this.handleEdit(e, todo.text)} type={todo.edit ? 'edit' : 'resubmit'}>{todo.edit ? 'Edit' : 'Resubmit'}</button>
                <button onClick={this.handleDelete} type="delete">Delete</button>
              </li>
            ) : (
              <li key={index}>
                <input type="text" name="task-edit" value={todo.text} onChange={(e) => this.handleResubmit(e, index)} />
                <button onClick={(e) => this.handleEdit(e, todo.text)} type={todo.edit ? 'edit' : 'resubmit'}>{todo.edit ? 'Edit' : 'Resubmit'}</button>
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
