type Props = { label: string; htmlFor?: string };

function FormLabel({ htmlFor, label }: Props) {
  return (
    <label
      htmlFor={htmlFor}
      className="h-6 text-xs text-neutral-800 md:text-sm dark:text-neutral-200"
    >
      {label}
    </label>
  );
}

export default FormLabel;
