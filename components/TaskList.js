"use client";

import { useState } from "react";
import { deleteTask, toggleTaskCompletion } from "../app/actions";
import { useRouter } from "next/navigation";
import EditTaskForm from "./EditTaskForm";

export default function TaskList({ tasks }) {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const router = useRouter();

    function handleEditClick(taskId) {
        setEditingTaskId(taskId);
    }

    function handleCancelEdit() {
        setEditingTaskId(null);
    }

    async function handleToggle(id) {
        await toggleTaskCompletion(id);
        router.refresh();
    }

    async function handleDelete(id) {
        await deleteTask(id);
        router.refresh();
    }

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0", listStyle: "none" }}>
                    {editingTaskId === task._id ? (
                        <EditTaskForm task={task} onCancel={handleCancelEdit} />
                    ) : (
                        <div className="task" style={task.completed ? { backgroundColor: "lightgreen" } : {}}>
                            <h2>{task.title}</h2>
                            <p>{task.description}</p>
                            {task.dueDate && <small>Due Date: {new Date(task.dueDate).toDateString()}</small>}
                            <br />
                            <button onClick={() => handleEditClick(task._id)}>Edit</button>
                            <button onClick={() => handleDelete(task._id)}>Delete</button>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleToggle(task._id)}
                            />
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
}
