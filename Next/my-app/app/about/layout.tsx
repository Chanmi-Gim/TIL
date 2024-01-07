import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'about',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className='font-bold text-purple-500'>This is About Layout</h2>
      {children}
    </>
  );
}
