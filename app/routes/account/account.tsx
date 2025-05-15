import { getMe } from "~/api/userApi";
import { getServerAuthToken } from "~/utils/helpers";
import type { Route } from "./+types/account";
import styles from "./account.module.css";
import AccountInfo from "./components/AccountInfo/AccountInfo";
import HeaderSection from "./components/HeaderSection/HeaderSection";
import UserInfo from "./components/UserInfo/UserInfo";

export function meta() {
  return [{ title: "Account" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = getServerAuthToken(request);
  const res: ResponseObject = await getMe(token);
  if (res.status === "success") {
    return res.data as IUser;
  }
}
function Account({ loaderData }: Route.ComponentProps) {
  if (loaderData) {
    return (
      <div className={styles.container}>
        <HeaderSection
          username={loaderData?.username as string}
          profileImg={loaderData?.imageUrl}
        />
        <UserInfo
          firstName={loaderData?.firstName}
          lastName={loaderData?.lastName}
          email={loaderData?.email}
          username={loaderData?.username}
        />
        <AccountInfo
          createdAt={loaderData.createdAt}
          role={loaderData.role}
          updatedAt={loaderData.updatedAt}
        />
      </div>
    );
  }
}

export default Account;
