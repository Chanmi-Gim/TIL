import { Link, useOutletContext } from 'react-router-dom';

export const Item = () => {
  const { item, saveCartItem } = useOutletContext<{
    item: Cart;
    saveCartItem: SaveCartItem;
  }>();
  return (
    <>
      <div
        style={{
          alignItems: 'center',
          padding: '3rem',
          border: '2px solid green',
        }}
      >
        {!item && <h2>Select Item, plz</h2>}
        {'  '}
        {item?.id}. {item?.name} ({item?.price.toLocaleString()}원)
        <Link to={`/items`} state={{ item }}>
          <strong>Edit</strong>
        </Link>
      </div>
    </>
  );
};
