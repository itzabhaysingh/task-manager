"use client";

import { useState } from "react";
import { addTask } from "../app/actions";
import { useRouter } from "next/navigation";

export default function TaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        await addTask(new FormData(e.target));
        router.refresh();
        setTitle("");
        setDescription("");
        setDueDate("");
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Task Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                name="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                name="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
}
