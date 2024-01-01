"use client";

import { useEffect, useState } from "react";
import { TiEdit, TiTick, TiTrash } from "react-icons/ti";

const ToDoList = () => {
  const [existingTasks, setExistingTasks] = useState([]);
  useEffect(() => {
    const newExistingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setExistingTasks(newExistingTasks);
  }, [existingTasks]);

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
                    <TiEdit className="text-2xl mx-auto text-green-600 inline-block cursor-pointer" />
                  </td>
                  <td>{singleTask?.isCompleted ? "Completed" : "Pending"}</td>
                  <td>
                    {singleTask?.isCompleted ? (
                      <TiTick className="text-2xl mx-auto text-green-600" />
                    ) : (
                      <button className="btn btn-sm">Mark Completed</button>
                    )}
                  </td>
                  <td>
                    <TiTrash className="text-2xl mx-auto text-red-600 cursor-pointer" />
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
