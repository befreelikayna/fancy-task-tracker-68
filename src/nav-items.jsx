import { HomeIcon, ListTodo } from "lucide-react";
import Index from "./pages/Index.jsx";
import TodoList from "./pages/TodoList.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "To-Do List",
    to: "/todo",
    icon: <ListTodo className="h-4 w-4" />,
    page: <TodoList />,
  },
];
