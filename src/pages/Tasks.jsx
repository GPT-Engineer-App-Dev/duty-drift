import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    setEditingTask(id);
    setEditingText(task.title);
  };

  const saveTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: editingText } : task
      )
    );
    setEditingTask(null);
    setEditingText("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Todo Application</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="flex-grow"
            />
            <Button onClick={addTask}>Add</Button>
          </div>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center gap-2">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleComplete(task.id)}
                />
                {editingTask === task.id ? (
                  <Input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={() => saveTask(task.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveTask(task.id);
                    }}
                    className="flex-grow"
                  />
                ) : (
                  <span
                    className={`flex-grow ${
                      task.completed ? "line-through" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => editTask(task.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <span>Total Tasks: {tasks.length}</span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Tasks;