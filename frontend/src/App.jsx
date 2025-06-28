import { Header } from "./components/Header";
import Login from "./components/login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authStatus } from "./redux/slices/authSlice";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import MyTasks from "./pages/MyTasks";
import NewTask from "./components/NewTask";
import EditTask from "./components/EditTask";
import LandingPage from "./components/LandingPage";

import WorkInProgress from "./components/WorkInProgress";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStatus());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Login />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id/newtask" element={<NewTask />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="/tasks" element={<MyTasks />} />
        <Route path="/tasks/:id" element={<EditTask />} />
        <Route path="/inbox" element={<WorkInProgress />} />
        <Route path="/reports" element={<WorkInProgress />} />
      </Routes>
    </>
  );
}

export default App;
