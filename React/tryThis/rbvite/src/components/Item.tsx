import { useLocation, useParams } from 'react-router-dom';

export const Item = () => {
  const { id } = useParams();
  const location = useLocation();
  const {
    state: { name, price },
  } = location;
  return (
    <>
      {id}. {name} ({price.toLocaleString()}원)
    </>
  );
};
