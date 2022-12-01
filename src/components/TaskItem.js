import React, { useContext, useState } from 'react';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { DeletedIdContext, EditedIdContext, EditedTextContext } from '../App';


const TaskItem = ({ addedTask, editedText, setEditedText }) => {
  const handleDeleteBtn = useContext(DeletedIdContext);
  const handleEditBtn = useContext(EditedIdContext);
  const handleEditedTextSubmitter = useContext(EditedTextContext);

  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className='w-full mx-auto p-5 bg-slate-800 flex justify-between mb-3 rounded hover:bg-gradient-to-r from-cyan-900 to-slate-800'>
      <div className='flex gap-3'>
        <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
        {
          !addedTask.isEditable ? (
            !isChecked ? <p className='text-slate-200'>{addedTask.text}</p> : <p className='line-through text-cyan-400'>{addedTask.text}</p>
          ) :
            <form onSubmit={(e) => handleEditedTextSubmitter(e, addedTask.id)}>
              <input
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                type="text" className='bg-transparent pb-1 border-b-2 border-cyan-600 outline-none text-cyan-100' />
            </form>
        }
      </div>
      <div className='flex gap-3 duration-300'>
        <button onClick={() => handleEditBtn(addedTask.id)}>
          <FiEdit className=' hover:text-cyan-600 text-slate-500' />
        </button>
        <button onClick={() => handleDeleteBtn(addedTask.id)}>
          <FiTrash2 className=' hover:text-red-400 text-slate-500' />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;