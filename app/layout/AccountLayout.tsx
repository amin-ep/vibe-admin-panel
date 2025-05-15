import { Outlet } from "react-router";
import Header from "~/components/Header/Header";
function AccountLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default AccountLayout;
