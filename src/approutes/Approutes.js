import { Route, Routes } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Master from "../pages/Master";
import FileManager from "../pages/FileManager";
import Analytics from "../pages/Analytics";
import Order from "../pages/Order";
import Saved from "../pages/Saved";
import Setting from "../pages/Setting";
import Login from "../pages/Login";
import Departments from "../pages/Departments";
import CreateTask from "../pages/CreateTask";
const Approutes = () => {
    return (<section>
            <SideBar>
                <Routes>
                    <Route path="" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/master" element={<Master />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/file-manager" element={<FileManager />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/settings" element={<Setting />} />
                    <Route path="/Master/departments" element={<Departments />} />
                    <Route path="/Master/crate-task" element={<CreateTask/>} />
                    <Route path="*" element={<> not found</>} />
                </Routes>
            </SideBar>
    </section>)
}

export default Approutes;