import "./App.css";
import AddUser from "./components/student/AddUser/AddUser.jsx";

import User from "./components/student/GetUsers/User.jsx";

import Update from "./components/student/updateuser/Update.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <AddUser />,
    },
    {
      path: "/update/:id",
      element: <Update />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
