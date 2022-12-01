import React, { useRef, useState } from 'react';


const AddTask = ({ addedTasks, setAddedTasks }) => {
  const [task, setTask] = useState('');

  const inputRef = useRef(null);

  // add task handle event
  const addTaskHandler = (e) => {
    e.preventDefault();

    // post task into server
    postTask(task);

    // clear input field
    // setTask('');
    inputRef.current.blur();
    inputRef.current.value = '';

  }

  // task posting
  const postTask = async (text) => {
    const response = await fetch('https://tabby-splashy-octopus.glitch.me/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        text  //text: text
      })
    });

    const data = await response.json();
    setAddedTasks([...addedTasks, data]);
  }


  return (
    <form
      onSubmit={addTaskHandler}
      className='w-5/6 mx-auto p-10 bg-slate-900 text-cyan-600 flex justify-between'>
      <input
        className='bg-transparent border-b-2 pb-2 outline-none focus:border-cyan-600 text-gray-200 border-gray-500'
        type="text" placeholder='Add your task!'
        required
        ref={inputRef}
        // set task
        onChange={(e) => setTask(e.target.value)} />
      <button type='submit' className='border-cyan-500 text-cyan-400 border-2 bg-cyan-900/95 hover:bg-cyan-500 hover:text-cyan-900 duration-300 p-1 rounded px-3'>Add Task</button>
    </form>
  );
};

export default AddTask;