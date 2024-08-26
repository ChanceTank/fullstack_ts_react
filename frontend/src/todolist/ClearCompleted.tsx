
import React from "react";

type ListProps = {
	clearCompleted: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * Renders a button component to clear completed items.
 *
 * @param clearCompleted - The event handler function to clear completed items.
 */
function ClearCompleted({ clearCompleted }: ListProps) {
	return <button className='btn' onClick={clearCompleted}>Clear Completed</button>;
}

export default ClearCompleted;
