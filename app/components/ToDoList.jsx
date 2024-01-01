"use client";

const ToDoList = () => {
  const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

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
              </tr>
            </thead>
            <tbody>
              {existingTasks?.map((singleTask) => (
                <tr key={singleTask?.id} className="text-center">
                  <td>{singleTask?.taskName}</td>
                  <td>{singleTask?.isCompleted ? "Completed" : "Pending"}</td>
                </tr>
              ))}
              {/* row 1 */}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ToDoList;
