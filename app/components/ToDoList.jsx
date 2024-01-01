"use client";

import { useEffect, useState } from "react";
import { TiEdit, TiTick, TiTrash } from "react-icons/ti";

const ToDoList = () => {
  const [updated, setUpdated] = useState(false);
  const [existingTasks, setExistingTasks] = useState([]);
  useEffect(() => {
    const newExistingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setExistingTasks(newExistingTasks);
  }, [updated]);

  // delete task

  const handleDeleteTask = (id) => {
    const newTaskList = existingTasks.filter((task) => task?.id !== id);
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
    setExistingTasks(newTaskList);
    setUpdated(!updated);
  };

  // mark as completed

  const handleMarkCompleted = (id) => {
    const selectedTask = existingTasks.find((task) => task?.id === id);

    if (selectedTask) {
      selectedTask.isCompleted = true;

      //create a new array that doesn't include the newly completed task
      const newTaskList = existingTasks.filter((task) => task?.id !== id);

      //updating the list using spread operator
      const updatedList = [...newTaskList, selectedTask];
      setExistingTasks(updatedList);
      localStorage.setItem("tasks", JSON.stringify(updatedList));
      setUpdated(!updated);
    }
  };

  //update task name
  const handleEditTask = (id) => {
    // const selectedTask = existingTasks?.find((task) => task?.id === id);
    // const newTaskList = existingTasks?.filter((task) => task?.id !== id);
    // if(selectedTask){
    //   // selectedTask.name = newname
    // }
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
                      onClick={() => {
                        handleEditTask(singleTask?.id);
                      }}
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
                          handleMarkCompleted(singleTask?.id);
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
    </div>
  );
};

export default ToDoList;
