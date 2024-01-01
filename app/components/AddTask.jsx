"use client";

import { IoMdAdd } from "react-icons/io";
import uuid from "react-uuid";

const AddTask = () => {
  const handleAddTask = (event) => {
    event.preventDefault();
    const form = event.target;
    const taskId = uuid();
    const taskName = form?.name?.value;
    const newTask = {
      id: taskId,
      taskName,
      isCompleted: false,
    };

    //checking existing tasks
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    existingTasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(existingTasks));

    //close modal after adding task
    document.getElementById("my_modal_1").close();

    //reload after adding a new task
    window.location.reload();
  };

  return (
    <div>
      <button
        className="btn btn-accent w-full"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Add New Task <IoMdAdd />
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add a Task</h3>

          <div className="modal-action justify-center">
            <form onSubmit={handleAddTask} method="dialog">
              <div className="join">
                <input
                  type="text"
                  name="name"
                  className="input input-bordered join-item"
                  placeholder="Task Name"
                  required
                />
                <input
                  type="submit"
                  className="btn join-item rounded-r-full"
                  value="Add Task"
                />
              </div>
            </form>
          </div>
          <button
            className="btn block mx-auto mt-4"
            onClick={() => document.getElementById("my_modal_1").close()}
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default AddTask;
