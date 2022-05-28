import React, { useState } from "react";
import Modal from "./components/Modal";

const todoItems = [
  {
    id: 1,
    title: "Go to Market",
    description: "Buy ingredients to prepare dinner",
    completed: true,
  },
  {
    id: 2,
    title: "Study",
    description: "Read Algebra and History textbook for the upcoming test",
    completed: false,
  },
  {
    id: 3,
    title: "Sammy's books",
    description: "Go to library to return Sammy's books",
    completed: true,
  },
  {
    id: 4,
    title: "Article",
    description: "Write article on how to use Django with React",
    completed: false,
  },
];

const App = () => {

  const [todoList, setTodoList] = useState(todoItems);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeItem, setActiveItem] = useState({});

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
    console.log("saved" + JSON.stringify(item));
  }

  const handleDelete = (item) => {
    console.log("deleted" + JSON.stringify(item));
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