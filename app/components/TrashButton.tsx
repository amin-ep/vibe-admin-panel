import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

type Props = { onClick: () => void };

function TrashButton({ onClick }: Props) {
  return (
    <button
      className="text-neutral-700 transition-all hover:scale-[1.2] hover:text-red-700"
      onClick={onClick}
      type="button"
    >
      <DeleteOutlineRoundedIcon fontSize="small" />
    </button>
  );
}

export default TrashButton;
