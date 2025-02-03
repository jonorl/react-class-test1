import React, { useState } from 'react';

// eslint-disable-next-line react/function-component-definition, react/prop-types
const FunctionalInput = ({ name }) => {
  /*
    We declare two state variables and their setters,
    one to store the To-Do's
    and the other to store the value of the input field
  */
  const [todos, setTodos] = useState([
    {id: 1, text: 'Just some demo tasks'},
    {id: 2, text: 'As an example'},
    ]);
  const [inputVal, setInputVal] = useState('');
  const [edit, setEdit] = useState(true)

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setTodos({ ...todos, text: inputVal })
    setTodos((todo) => [...todo, { id:todos.length+1, text: inputVal}]);
    setInputVal('');
    console.log(todos)
    return todos
  };

  const handleDelete = (e) => {
    console.log(e.target.previousSibling.previousSibling.previousSibling.previousSibling.data)
    const filteredArray = todos.filter(task => task.text !== e.target.previousSibling.previousSibling.previousSibling.previousSibling.data);
    setTodos([...filteredArray]);
    return todos
  };

  const handleEdit = () => {
    setEdit(!(edit))
  }


  return (
    <section>
      <h3>{name}</h3>
      {/* The input field to enter To-Do's */}
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h4>All the tasks!</h4>
      <h4>Count: {todos.length}</h4>
      {/* The list of all the To-Do's, displayed */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{edit ? todo.text : <input type="text" name="task-edit" value={todo.text} /> } {edit ? <button onClick={handleEdit} type="edit">Edit</button> : <button onClick={handleEdit} type="resubmit">Resubmit</button>}  <button onClick={handleDelete} type="delete">Delete</button></li>
        ))}
      </ul>
    </section>
  );
};

export default FunctionalInput;
