import { forwardRef, useImperativeHandle } from 'react';

type Props = {
    increaseOrDecreaseCount : (amount : number) => void 
}
const Counter = forwardRef(({increaseOrDecreaseCount} : Props, ref)=>{
    const handleIncrease = () => {increaseOrDecreaseCount(1)}
    const handleDecrease = () => {increaseOrDecreaseCount(-1)}
    useImperativeHandle(ref, ()=> ({handleIncrease, handleDecrease}))
    return (
        <div>
            <button onClick={handleIncrease}>+</button>
            <button onClick={handleDecrease}>-</button>
        </div>
    )
})

export default Counter;