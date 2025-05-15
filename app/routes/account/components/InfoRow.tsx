import FormControl from "~/components/FormControl";

type Props = {
  title: string;
  value: string;
};

function InfoRow({ title, value }: Props) {
  return (
    <div className="flex flex-col gap-0.5 sm:gap-1">
      <p className="text-xs text-neutral-700 md:text-sm">{title}</p>
      <div>
        <p className="text-sm text-neutral-800 md:text-base">{value}</p>
      </div>
    </div>
  );
}

export default InfoRow;
