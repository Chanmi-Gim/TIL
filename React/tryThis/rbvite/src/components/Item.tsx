import { useEffect, useReducer, useRef } from 'react';
import {
  // useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';

export const Item = () => {
  const { item, saveCartItem } = useOutletContext<{
    item: Cart;
    saveCartItem: SaveCartItem;
  }>();
  const [isEditing, toggleEditing] = useReducer(
    (preEditing) => !preEditing,
    false
  );
  const [, setSearchParams] = useSearchParams({
    searchStr: '',
    itemId: '',
  });
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  // const navigate = useNavigate();

  const editingOrSave = () => {
    if (isEditing) {
      if (nameRef.current && priceRef.current) {
        const itemId = saveCartItem(
          item.id || 0,
          nameRef.current.value,
          +priceRef.current.value
        );
        setSearchParams({ itemId: String(itemId) });
      }
    }
    toggleEditing();
  };
  useEffect(() => {
    if (nameRef.current && priceRef.current) {
      nameRef.current.value = item.name;
      priceRef.current.value = String(item.price);
      nameRef.current.select();
    }
    // navigate('.', { state: '' });
  }, [item, isEditing]);

  useEffect(() => {
    if (item?.id === 0) toggleEditing();
  }, [item?.id]);

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

        {isEditing ? (
          <form>
            <input type='text' ref={nameRef} placeholder='아이템명' />
            <input type='text' ref={priceRef} placeholder='가격' />
          </form>
        ) : (
          <div>
            {item?.id}. {item?.name} ({item?.price.toLocaleString()}원)
          </div>
        )}
        {isEditing && <button onClick={() => toggleEditing()}>Cancel</button>}
        <button onClick={editingOrSave}>{isEditing ? 'Save' : 'Edit'}</button>
      </div>
    </>
  );
};
