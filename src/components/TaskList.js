import React from 'react';
import Spinner from '../utilitis/Spinner';
import TaskItem from './TaskItem';

const TaskList = ({ addedTasks, loading, error, editedText, setEditedText }) => {
  return (
    <div className='w-5/6 mx-auto p-10 bg-slate-900 text-cyan-600'>
      {
        loading
          ?
          <p className='text-center'>{error ? error : <Spinner />}</p>
          :
          addedTasks.length === 0 && <p className='text-center'>No task to show.</p>
      }
      {
        addedTasks.map(addedTask => <TaskItem key={addedTask.id}
          addedTask={addedTask}
          editedText={editedText}
          setEditedText={setEditedText} />)
      }
    </div>
  );
};

export default TaskList;