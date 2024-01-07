export default function HelloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h2>this is Hello Layout!</h2>
      <div className='border border-dotted p-5 col-span-3'>{children}</div>
    </>
  );
}
