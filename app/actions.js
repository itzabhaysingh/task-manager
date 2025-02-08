"use server";

import { connectDB } from "../lib/mongodb";
import Task from "../models/Task";

// Fetch all tasks
export async function getTasks() {
    await connectDB();
    const tasks = await Task.find().lean().sort({ createdAt: -1 });

    // Convert Mongoose documents to plain objects
    return tasks.map(task => ({
        _id: task._id.toString(),  // Convert ObjectId to string
        title: task.title,
        description: task.description,
        dueDate: task.dueDate?.toISOString(), // Convert Date to string
        completed: task.completed
    }));
}

// Add a new task
export async function addTask(formData) {
    await connectDB();
    const { title, description, dueDate } = Object.fromEntries(formData);
    const newTask = new Task({ title, description, dueDate });
    await newTask.save();
}

// Update task completion status
export async function toggleTaskCompletion(id) {
    await connectDB();
    const task = await Task.findById(id);
    if (task) {
        task.completed = !task.completed;
        await task.save();
    }
}

// Delete a task
export async function deleteTask(id) {
    await connectDB();
    await Task.findByIdAndDelete(id);
}

// Update a task
export async function updateTask(formData) {
    await connectDB();
    const { id, title, description, dueDate } = Object.fromEntries(formData);

    await Task.findByIdAndUpdate(id, {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
    });
}  