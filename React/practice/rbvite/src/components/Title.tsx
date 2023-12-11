import { PropsWithChildren } from 'react';

type Props = {
  title: string;
  color : string;
  children: React.ReactNode;
};
const Title = ({ title, color, children }: PropsWithChildren<Props>) => {
  return (
    <>
      <h1 style={{color}}>{title}</h1>
      <h3>{children}</h3>
    </>
  );
};

export default Title;
