import { PropsWithChildren } from 'react';
type Props = {
  borderWidth: string;
  borderColor: string;
  borderStyle: string;
  padding: string;
  margin: string;
};
const Box = ({
  borderWidth,
  borderColor,
  borderStyle,
  padding,
  margin,
  children,
}: PropsWithChildren<Props>) => {
  const styles = {
    borderWidth: borderWidth,
    borderColor: borderColor,
    borderStyle: borderStyle,
    padding: padding,
    margin: margin,
    children: children,
  };
  return (
    <>
      <div style={styles}>{children}</div>
    </>
  );
};

export default Box;
