import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import SelectedBooks from "./pages/SelectedBooks";
import Instructor from "./components/Instructor";
import SavedClass from "./pages/SavedClass";
import EnrolledClass from "./pages/EnrolledClass";
import AddClass from "./pages/AddClass";
import Myclass from "./pages/Myclass";
import ManageClasses from "./pages/ManageClasses";
import ManageUsers from "./pages/ManageUsers";
import Class from "./pages/Class";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Payment from "./pages/Payment";
import PaymentHistory from "./pages/PaymentHistory";
import PrivateRoute from "./components/PrivateRoute";
import Notfound from "./pages/NotFound";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="instractors" element={<Instructor />} />
          <Route path="classes" element={<Class />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard/users" element={<Instructor />} />
            <Route path="/dashboard/saved-class" element={<SavedClass />} />
            <Route
              path="/dashboard/enrolled-class"
              element={<EnrolledClass />}
            />
            <Route path="/dashboard/add-class" element={<AddClass />} />
            <Route path="/dashboard/my-class" element={<Myclass />} />
            <Route
              path="/dashboard/manage-classes"
              element={<ManageClasses />}
            />
            <Route path="/dashboard/manage-users" element={<ManageUsers />} />
            <Route
              path="/dashboard/selected-books"
              element={<SelectedBooks />}
            />
            <Route path="/dashboard/payment" element={<Payment />} />
            <Route
              path="/dashboard/payment-history"
              element={<PaymentHistory />}
            />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
