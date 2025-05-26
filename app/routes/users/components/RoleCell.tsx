import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { TableCell } from "@mui/material";
import type { AxiosError } from "axios";
import clsx from "clsx";
import { useState, useTransition } from "react";
import { useRevalidator } from "react-router";
import ApiRequests from "~/api";
import DropdownMenu from "~/components/DropdownMenu";
import { useAuth } from "~/contexts/AuthContext";
import { useToast } from "~/store/useToast";

type Props = { role: IUser["role"]; id: string };

function RoleCell({ role, id }: Props) {
  const [isPending, startTransition] = useTransition();
  const [rolesIsOpen, setRolesIsOpen] = useState(false);
  const { userdata } = useAuth();

  const { error } = useToast();

  const revalidator = useRevalidator();

  const api = new ApiRequests();
  function changeRole(role: IUser["role"]) {
    startTransition(async function () {
      const payload = { role: role };
      const res = await api.updateDataById("user", id, payload);

      if (res.status === 200) {
        revalidator.revalidate().then(() => {
          setRolesIsOpen(false);
        });
      } else {
        const errorResponse = res as AxiosError<IApiError>;
        error(errorResponse.response?.data.message || "Something went wrong!");
      }
    });
  }

  return (
    <TableCell className="table-cell-classes relative capitalize">
      {userdata?.role === "owner" && userdata._id !== id ? (
        <>
          <button
            onClick={() => setRolesIsOpen(true)}
            className="flex cursor-pointer items-center gap-0.5 rounded-lg"
          >
            <p>{role}</p>
            <KeyboardArrowDownRoundedIcon
              className={clsx(
                rolesIsOpen ? "rotate-180" : "",
                "transition-all duration-300",
              )}
            />
          </button>
          {rolesIsOpen && (
            <DropdownMenu
              className="top-17 left-4"
              close={() => setRolesIsOpen(false)}
            >
              <DropdownMenu.Row>
                <DropdownMenu.RowButton
                  className={
                    role === "admin" ? "font-bold text-blue-400" : undefined
                  }
                  onClick={() => changeRole("admin")}
                >
                  admin
                </DropdownMenu.RowButton>
              </DropdownMenu.Row>
              <DropdownMenu.Row>
                <DropdownMenu.RowButton
                  className={
                    role == "user" ? "font-bold text-blue-400" : undefined
                  }
                  onClick={() => changeRole("user")}
                >
                  user
                </DropdownMenu.RowButton>
              </DropdownMenu.Row>
            </DropdownMenu>
          )}
        </>
      ) : (
        <span>{role}</span>
      )}
    </TableCell>
  );
}

function RoleCellButton() {}

export default RoleCell;
