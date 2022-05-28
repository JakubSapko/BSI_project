import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "./components/Modal";


const App = () => {

  const [todoList, setTodoList] = useState([]);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeItem, setActiveItem] = useState({});

  useEffect(() => {
    refreshList();
  }, [])

  const refreshList = () =>{
    axios
          .get("http://localhost:8000/api/todos/")
          .then((response) => {setTodoList(response.data); console.log(response)})
          .catch((error) => console.log(error));
  }

  const displayCompleted = (status) => {
    if (status){
      return setViewCompleted(true);
    }
    return setViewCompleted(false);
  };

  const toggle = () => {
    setVisible(visible => !visible);
  }

  const handleSubmit = (item) => {
    toggle();
    if (item.id){
      axios
           .put(`http://localhost:8000/api/todos/${item.id}/`, item)
           .then((response) => refreshList());
      return;
    }
    axios
         .post("http://localhost:8000/api/todos/", item)
         .then((response) => refreshList());
  }

  const handleDelete = (item) => {
    axios
         .delete(`http://localhost:8000/api/todos/${item.id}/`)
         .then((response) => refreshList());
  }

  const createItem = () => {
    const item = {title: "", description: "", completed: false};
    setActiveItem(item);
    setVisible(visible => !visible);
  }

  const editItem = (item) => {
    setActiveItem(item);
    setVisible(visible => !visible);

  }
  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => displayCompleted(true)}
        >
          Complete
        </span>
        <span
          className={viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => displayCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    );
  };

  const renderItems = () => {
    const newItems = todoList.filter(
      (item) => item.completed == viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };


    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={() => createItem()}
                >
                  Add task
                </button>
              </div>
              {renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {visible ? (
          <Modal
            activeItem={activeItem}
            toggle={toggle}
            onSave={handleSubmit}
            />
        ) : null
        }
      </main>
    );
}

export default App;