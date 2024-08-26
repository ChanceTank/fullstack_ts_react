
import { useState } from 'react';
import ToDo from './todo';

type FormProps = {
  addToDo: (toDo: ToDo) => void;//overwrite, add a toDo item the state
};


/**
 * takes the addToDo function as a prop and returns an 
 * HTML form that can move text into the state
 *
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.addToDo - The function to add a to-do item to the state.
 * @returns {JSX.Element} The rendered form component.
 */
function Form({ addToDo: addTodo }: FormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //if the form is blank then alert the user and do nothing
    if (!text) {
      alert('please enter a task');
      return;
    }
    addTodo(new ToDo(new Date().getTime(), text, false));//otherwise push the toDo item to the state
    
     
    setText(''); //reset the form text
  };

  return (
    <form className='form task-form' onSubmit={handleSubmit}>
      <input
        type='text'
        className='form-input'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type='submit' className='btn'>
        add to do
      </button>
    </form>
  );
}
export default Form;
