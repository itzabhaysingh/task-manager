import { getTasks } from "./actions";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export const dynamic = "force-dynamic";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main>
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskList tasks={tasks} />
    </main>
  );
}