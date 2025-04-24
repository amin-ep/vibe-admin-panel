import { Tooltip } from "@mui/material";
import styles from "./HeaderTooltip.module.css";
import IconButton from "./IconButton";

type Props = {
  children: React.ReactNode;
  title: string;
  disableHoverListener?: boolean;
  onClick: () => void;
};

function HeaderTooltip({
  children,
  title,
  disableHoverListener,
  onClick,
}: Props) {
  return (
    <Tooltip
      title={title}
      classes={{
        tooltip: styles.tooltip,
        arrow: styles.arrow,
      }}
      arrow
      disableHoverListener={disableHoverListener}
    >
      <IconButton onClick={onClick}>{children}</IconButton>
    </Tooltip>
  );
}

export default HeaderTooltip;
