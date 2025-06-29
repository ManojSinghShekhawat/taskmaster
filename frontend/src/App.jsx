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
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

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
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:id/newtask"
          element={
            <ProtectedRoute>
              <NewTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <Project />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <WorkInProgress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <WorkInProgress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
