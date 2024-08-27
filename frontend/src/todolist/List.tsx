import { useState } from "react";
import ToDo from "./todo";

type ListProps = {
	toDoList: ToDo[];
	toggleTask: ({ updateTask }: { updateTask: ToDo }) => void;
};

/**
 * Renders a list of to-do items.
 * takes the toDoList state, and the toggleTask function
 * as props and returns them in an HTML list.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ToDo[]} props.toDoList - The array of to-do items.
 * @param {function} props.toggleTask - The function to toggle a task's completion status.
 * @returns {JSX.Element} The rendered list of to-do items.
 */
function List({ toDoList, toggleTask }: ListProps) {
	const [isHovered, setIsHovered] = useState(false); // Declare and initialize the 'isHovered' state
	return (
		<ul className="list">
			{toDoList.map((toDo) => {
				return (
					<li key={toDo.id}>
						<p
							className={`task-text ${isHovered ? "highlight" : ""}`}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}>
							{toDo.content}{" "}
						</p>
						<div className="CompletedBox" style={{ textAlign: "right" }}>
							Completed:{" "}
							<input
								type="checkbox"
								checked={toDo.isCompleted}
								onChange={() => {
									toggleTask({ updateTask: toDo });
								}}
							/>
						</div>
					</li>
				);
			})}
		</ul>
	);
}
export default List;
