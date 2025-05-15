import moment from "moment";
import InfoContainer from "../InfoContainer";
import InfoRow from "../InfoRow";
import styles from "./AccountInfo.module.css";

type Props = { role: IUser["role"]; createdAt: Date; updatedAt: Date };

function AccountInfo({ role, createdAt, updatedAt }: Props) {
  return (
    <InfoContainer className={styles["account-info"]}>
      <InfoRow title="Role" value={role} />
      <InfoRow
        title="Member Since"
        value={moment(createdAt).format("D MMMM, YYYY")}
      />
      <InfoRow
        title="Last Update"
        value={
          new Date(createdAt).getTime() == new Date(updatedAt).getTime()
            ? "Not updated yet"
            : moment(updatedAt).format("D MMMM, YYYY")
        }
      />
    </InfoContainer>
  );
}

export default AccountInfo;
