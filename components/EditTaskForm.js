"use client";

import { useState } from "react";
import { updateTask } from "../app/actions";
import { useRouter } from "next/navigation";

export default function EditTaskForm({ task, onCancel }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.split("T")[0] : "");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("id", task._id);  // Pass task ID for updating

        await updateTask(formData);
        router.refresh();
        onCancel();  // Close the edit form after update
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                name="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button type="submit">Update Task</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
}
