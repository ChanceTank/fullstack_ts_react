/*create a react framework to query the backend for the todo list
and display it in a list.  
Add a form to add a new todo item to the list.
Add a button to delete a todo item from the list.  
Add a button to edit/update a todo item in the list.

*/

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Form from "./Form";
import List from "./List";
import ClearCompleted from "./ClearCompleted";
import ToDo from "./todo";

//const backendUrl = 'http://localhost:3001/';
const taskListUrl = "http://localhost:3001/todolist";

export default function Tasks() {
	const [toDoState, setList] = useState<ToDo[]>([]);

	//adds a task to the state
	const addToDo = (toDo: ToDo): void => {
		setList([...toDoState, toDo]); //save to state
		//put to backend
		axios.post(taskListUrl, toDo).then((response) => {
			console.log(response);
		});
	};

	const fetchData = async () => {
		try {
			const response = await axios.get(taskListUrl);
			setList(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	function toggleTask({ updateTask }: { updateTask: ToDo }): void {
		updateTask.isCompleted = !updateTask.isCompleted;
		setList(
			toDoState.map((task) => {
				if (task.id === updateTask.id) {
					return {
						...task,
						isCompleted: updateTask.isCompleted
					};
				}
				return task;
			})
		);
		//put to backend the update to isCompleted
		axios.put(`${taskListUrl}`, updateTask).then((response) => {
			console.log(response);
		});
	}

	function clearCompleted() {
		//delete from backend
		toDoState.forEach((task) => {
			if (task.isCompleted) {
				axios.delete(`${taskListUrl}`, { data: { id: task.id } }).then((response) => {
					console.log(response);
				});
			}
		});
		
		
		//clear from ui
		setList(toDoState.filter((task) => !task.isCompleted));
		
		
	}

	return (
		<div>
			<div hidden>
				{/*you can use the hidden to block out stuff during development*/}
				<button onClick={fetchData}>Load Backend in Frontend</button>
				<p />
				<button onClick={() => setList([])}>Clear</button>
				<p>{toDoState && JSON.stringify(toDoState)}</p>
			</div>
			<section>
				<Form addToDo={(toDo: ToDo) => addToDo(toDo)} />
				<List toDoList={toDoState} toggleTask={toggleTask} />
				<ClearCompleted clearCompleted={clearCompleted} />
			</section>
		</div>
	);
}
