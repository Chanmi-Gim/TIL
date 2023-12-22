import { FormEvent, useEffect, useRef, useState } from 'react';
import { useSession } from '../hooks/session-context';
import './Items.css';
import { useOutletContext } from 'react-router-dom';

export const Items = () => {
  const {
    session: { cart },
    saveCartItem,
  } = useSession();

  const itemIdRef = useRef<number>(0);
  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);
  const [hasDirty, setDirty] = useState(false);
  const { currItem, setCurrItem } = useOutletContext<{
    currItem: Cart | undefined;
    setCurrItem: React.Dispatch<React.SetStateAction<Cart | undefined>>;
  }>();
  const {
    id: itemId,
    name: itemName,
    price: itemPrice,
  } = currItem || { id: 0, name: '', price: 0 };

  useEffect(() => {
    if (itemNameRef.current && itemPriceRef.current) {
      itemIdRef.current = itemId;
      itemNameRef.current.value = itemName;
      itemPriceRef.current.value = itemPrice + '';
    }
  }, [itemId, itemName, itemPrice]);

  const checkDirty = () => {
    const id = itemIdRef.current;
    const name = itemNameRef.current?.value;
    const price = itemPriceRef.current?.value;
    const selectedItem = !id
      ? { name: '', price: '' }
      : cart.find((item) => item.id === id) || {
          name: '',
          price: '',
        };
    setDirty(name !== selectedItem.name || price !== selectedItem.price);
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = itemNameRef.current?.value;
    const price = itemPriceRef.current?.value;
    if (!name) {
      alert('상품명을 정확히 알려주세요!');
      return itemNameRef.current?.focus();
    }
    if (!price) {
      alert('가격을 정확히 알려주세요!');
      return itemPriceRef.current?.focus();
    }
    saveCartItem(itemIdRef.current, name, Number(price));
    itemIdRef.current = 0;
    itemNameRef.current.value = '';
    itemPriceRef.current.value = '';
    setDirty(false);
    setCurrItem(undefined);
  };

  return (
    <>
      <div>
        <form onSubmit={submit}>
          <input type='text' ref={itemNameRef} onChange={() => checkDirty()} />
          <input
            type='number'
            ref={itemPriceRef}
            onChange={() => checkDirty()}
          />
          {hasDirty && <button type='submit'>Save</button>}
        </form>
      </div>
    </>
  );
};
