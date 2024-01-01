"use client";

import { useEffect, useState } from "react";
import { TiEdit, TiTick, TiTrash } from "react-icons/ti";
import Swal from "sweetalert2";

const ToDoList = () => {
  const [updated, setUpdated] = useState(false);
  const [existingTasks, setExistingTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    const newExistingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setExistingTasks(newExistingTasks);
  }, [updated]);

  // delete task
  const handleDeleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTaskList = existingTasks.filter((task) => task?.id !== id);
        localStorage.setItem("tasks", JSON.stringify(newTaskList));
        setExistingTasks(newTaskList);
        setUpdated(!updated);
        Swal.fire({
          title: "Deleted!",
          text: "The task has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // mark as completed
  const handleMarkCompleted = (id, name) => {
    const selectedTask = existingTasks.find((task) => task?.id === id);

    if (selectedTask) {
      selectedTask.isCompleted = true;

      const newTaskList = existingTasks.filter((task) => task?.id !== id);
      const updatedList = [...newTaskList, selectedTask];
      setExistingTasks(updatedList);
      localStorage.setItem("tasks", JSON.stringify(updatedList));
      Swal.fire({
        icon: "success",
        title: `${name} has been marked as completed`,
        showConfirmButton: false,
        timer: 1500,
      });
      setUpdated(!updated);
    }
  };

  // set the selected task ID when clicking the edit icon
  const handleEditClick = (id) => {
    setSelectedTaskId(id);
    document.getElementById("my_modal_2").showModal();
  };

  // update task name
  const handleEditTask = (event) => {
    event.preventDefault();
    const form = event.target;
    const newName = form?.name?.value;
    const selectedTask = existingTasks?.find(
      (task) => task?.id === selectedTaskId
    );
    const newTaskList = existingTasks?.filter(
      (task) => task?.id !== selectedTaskId
    );

    if (selectedTask) {
      selectedTask.taskName = newName;
      const updatedList = [...newTaskList, selectedTask];
      setExistingTasks(updatedList);
      localStorage.setItem("tasks", JSON.stringify(updatedList));
      setUpdated(!updated);
      Swal.fire({
        icon: "success",
        title: `Task name has been changed to ${newName}`,
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById("my_modal_2").close();
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        {existingTasks?.length === 0 ? (
          <p>No tasks added</p>
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>Task</th>
                <th>Status</th>
                <th>Mark As Completed</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* all rows */}
              {existingTasks?.map((singleTask) => (
                <tr key={singleTask?.id} className="text-center">
                  <td>
                    {singleTask?.taskName}{" "}
                    <TiEdit
                      onClick={() => handleEditClick(singleTask?.id)}
                      className="text-2xl mx-auto text-green-600 inline-block cursor-pointer"
                    />
                  </td>
                  <td>{singleTask?.isCompleted ? "Completed" : "Pending"}</td>
                  <td>
                    {singleTask?.isCompleted ? (
                      <TiTick className="text-2xl mx-auto text-green-600" />
                    ) : (
                      <button
                        onClick={() => {
                          handleMarkCompleted(
                            singleTask?.id,
                            singleTask?.taskName
                          );
                        }}
                        className="btn btn-sm"
                      >
                        Mark Completed
                      </button>
                    )}
                  </td>
                  <td>
                    <TiTrash
                      onClick={() => {
                        handleDeleteTask(singleTask?.id);
                      }}
                      className="text-2xl mx-auto text-red-600 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* edit name modal */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update a Task</h3>
          <div className="modal-action justify-center">
            <form onSubmit={handleEditTask} method="dialog">
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
                  value="Update"
                />
              </div>
            </form>
          </div>
          <button
            className="btn block mx-auto mt-4"
            onClick={() => document.getElementById("my_modal_2").close()}
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ToDoList;
