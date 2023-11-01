export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h2>header</h2>
      {children}
    </>
  );
}
