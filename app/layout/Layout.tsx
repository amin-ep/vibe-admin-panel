import { useState } from "react";
import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Layout() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <div>
      <Header openSidebar={() => setSidebarIsOpen(true)} />
      <Sidebar setIsOpen={setSidebarIsOpen} isOpen={sidebarIsOpen} />
      <main className="md:ml-20 text-gray-900 dark:text-gray-100">
        <h1>Main</h1>
        <Outlet />
      </main>
    </div>
  );
}
