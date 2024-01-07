export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h2>this is Routes-layout</h2>
      <div className='border border-dotted p-5 col-span-3'>{children}</div>
    </>
  );
}
