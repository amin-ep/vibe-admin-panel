import clsx from "clsx";
import InfoRow from "../InfoRow";
import styles from "./UserInfo.module.css";
import InfoContainer from "../InfoContainer";

type Props = {
  firstName: IUser["firstName"];
  lastName: IUser["lastName"];
  email: IUser["email"];
  username: IUser["username"];
};

function UserInfo({ email, firstName, lastName, username }: Props) {
  return (
    <InfoContainer className={clsx(styles["user-info"])}>
      <InfoRow title="First Name" value={firstName ?? "-"} />
      <InfoRow title="Last Name" value={lastName ?? "-"} />
      <InfoRow title="Username" value={username ?? "-"} />
      <InfoRow title="Email" value={email} />
    </InfoContainer>
  );
}

type Row = {};

export default UserInfo;
