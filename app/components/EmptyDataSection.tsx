type Props = {
  message: string;
  children: React.ReactNode;
};
export default function EmptyDataSection({ children, message }: Props) {
  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <h1 className="text-3xl md:text-4xl">{message}</h1>
      {children}
    </section>
  );
}
