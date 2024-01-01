import AddTask from "./components/AddTask";
import ToDoList from "./components/ToDoList";

export default function Home() {
  return (
    <main className="p-24 text-center max-w-4xl mx-auto space-y-5">
      <div className="space-y-3">
        <h1 className="text-2xl mb-3">To-do Application</h1>
        <AddTask />
      </div>
      <ToDoList />
    </main>
  );
}
