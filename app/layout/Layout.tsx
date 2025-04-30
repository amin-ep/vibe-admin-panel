import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

export default function Layout() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <div>
      <Header openSidebar={() => setSidebarIsOpen(true)} />
      <Sidebar setIsOpen={setSidebarIsOpen} isOpen={sidebarIsOpen} />
      <main className="md:ml-20 text-neutral-900 dark:text-neutral-200 mt-16 md:mt-18  py-12 md:py-16">
        <div className="mx-auto max-w-[80rem] w-full px-3">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
