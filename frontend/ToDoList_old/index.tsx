import { useState, useEffect } from 'react';
import Form from './Form';
import List from './List';
import { type ToDo } from './types';
import ClearCompleted from '../src/todolist/ClearCompleted';

//pulls from local storage and loads into object
function loadToDo(): ToDo[] {
  const storedToDo = localStorage.getItem('toDoList');
  return storedToDo ? JSON.parse(storedToDo) : [];
}

//updates local storage
function updateStorage(toDoList: ToDo[]): void {
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
}


/**
 * Demonstrates the use of TypeScript in a simple todo list application
 * making use of local storage to save data.
 *
 * @returns {ToDo[]} The loaded todo list from local storage.
 */
function Component() {
  //initializes the state with the data from local storage
  const [toDoState, setList] = useState<ToDo[]>(() => loadToDo());

  //adds a task to the state
  const addToDo = (toDo: ToDo): void => {
    setList([...toDoState, toDo]);
  };
  
  //removes all the completed tasks
  const clearCompleted = (): void =>{
    setList(toDoState.filter((toDo) => !toDo.isCompleted));
  };



  /**
   * toggles the task completion status
   * overwrites the function in the ListProps
   * 
   * @param {Object} options - The options object.
   * @param {string} options.id - The ID of the task to toggle.
   */
  const toggleTask = ({ id }: { id: string }) => {
    setList(
      toDoState.map((toDo) => {
        if (toDo.id === id) {
          return { ...toDo, isCompleted: !toDo.isCompleted };//return the toDo item, and flip the completion status, to the state
        }
        return toDo;
      })
    );
  };

  //updates local storage when the state changes
  useEffect(() => {
    updateStorage(toDoState);
  }, [toDoState]);

  return (
    <section>
      <Form addToDo={addToDo} />
      <List toDoList={toDoState} toggleTask={toggleTask} />
      <ClearCompleted clearCompleted={clearCompleted} />
    </section>
  );
}
export default Component;
