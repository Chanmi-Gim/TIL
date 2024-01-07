export default function AboutTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className='font-bold text-blue-500'>This is About Template</h1>
      <div className='border-2 border-blue-500 border-solidx border-dotted p-2'>
        {children}
      </div>
    </>
  );
}
