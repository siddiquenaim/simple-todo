import { IoMdAdd } from "react-icons/io";

const AddTask = () => {
  return (
    <div>
      <button className="btn btn-accent w-full">
        Add New Task <IoMdAdd />
      </button>
    </div>
  );
};

export default AddTask;
