const ToDoList = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToDoList;
