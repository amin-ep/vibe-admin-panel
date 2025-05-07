import ApiRequests from "~/api";
import PageHeading from "~/components/PageHeading";
import type { Route } from "./+types/users";
import UserTable from "./components/UserTable";
import UserTableBody from "./components/UserTableBody";

export function meta() {
  return [{ title: "Users" }];
}

export async function clientLoader() {
  const api = new ApiRequests();
  const userData = await api.getAllData<IUser>("user");
  return userData?.data;
}

function Users({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <PageHeading title="Users" />

      <div>
        <UserTable>
          {loaderData && <UserTableBody data={loaderData as IUser[]} />}
        </UserTable>
      </div>
    </div>
  );
}

export default Users;
