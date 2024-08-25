/*create a react framework to query the backend for the todo list
and display it in a list.  
Add a form to add a new todo item to the list.
Add a button to delete a todo item from the list.  
Add a button to edit/update a todo item in the list.

*/



import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
//import Todo from '../../../Shared/todo'; 

const backendUrl = 'http://localhost:3001/';

export default function Tasks() {
    const [data, setData] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(backendUrl);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <button onClick={fetchData}>Load Backend in Frontend</button>
            <p/>
            <button onClick={() => setData('')}>Clear</button>
            <p>{data}</p>
        </div>
    );
}
