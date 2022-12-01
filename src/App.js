import { createContext, useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskList from "./components/TaskList";

export const DeletedIdContext = createContext();
export const EditedIdContext = createContext();
export const EditedTextContext = createContext();

function App() {
  const [addedTasks, setAddedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [editedText, setEditedText] = useState('');
  const [toggleEditMode, setToggleEditMode] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, [])

  // handle submitting edited text
  const handleEditedTextSubmitter = (e, id) => {
    e.preventDefault();

    setToggleEditMode(!toggleEditMode);

    const newText = {
      text: editedText,
      id: id
    };

    // putting request
    puttingRequest(id, newText);

    // real time update
    const [editableTask] = addedTasks.filter(addedTask => addedTask.id === id);
    editableTask.isEditable = false;
    editableTask.text = editedText;
  }


  const puttingRequest = async (id, newData) => {
    console.log(id);
    console.log(editedText);
    const res = await fetch(`https://tabby-splashy-octopus.glitch.me/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newData)
    });
    const data = await res.json();
    // console.log(data);
  }

  // Edit button handler
  const handleEditBtn = (id) => {

    // add editable property
    const [editableTask] = addedTasks.filter(addedTask => addedTask.id === id);
    editableTask.isEditable = true;
    setEditedText(editableTask.text);
    setAddedTasks([...addedTasks]);
    console.log(editableTask);

    // set edited text

    // toggle isEditable property
    addedTasks.filter(addedTask => addedTask.id !== id).map(notEditableTask => notEditableTask.isEditable = false);

  }

  // Delete button handler
  const handleDeleteBtn = (id) => {

    // delete the object containing id from UI
    const selectNewTasks = addedTasks.filter(addedTask => addedTask.id !== id);
    setAddedTasks(selectNewTasks);

    // delete the object containing id from server
    deleteData(id);
  }

  const deleteData = async (id) => {
    fetch(`https://tabby-splashy-octopus.glitch.me/tasks/${id}`, {
      method: 'DELETE',
    })
  }


  const fetchTasks = async () => {
    try {
      const response = await fetch('https://tabby-splashy-octopus.glitch.me/tasks');
      if (!response.ok) throw new Error("Can't fetch data!");
      const data = await response.json();
      setAddedTasks(data);
      setLoading(false);
    }
    catch (error) {
      // console.log(error.message);
      setError(error.message);
    }
  }

  return (
    <div className="App bg-gradient-to-t to-cyan-900 p-10  text-xl from-gray-900 min-h-screen">
      <Header />
      <AddTask addedTasks={addedTasks} setAddedTasks={setAddedTasks} />
      <DeletedIdContext.Provider value={handleDeleteBtn}>
        <EditedIdContext.Provider value={handleEditBtn}>
          <EditedTextContext.Provider value={handleEditedTextSubmitter}>
            <TaskList
              addedTasks={addedTasks}
              loading={loading}
              error={error}
              editedText={editedText}
              setEditedText={setEditedText} />
          </EditedTextContext.Provider>
        </EditedIdContext.Provider>
      </DeletedIdContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
