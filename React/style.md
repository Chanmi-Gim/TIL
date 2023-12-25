# Style

## CSS class 스타일 적용

```css
.skyblue-background {
    color: white;
    background-color: skyblue;
}
```

<br>

### 파일을 바로 Import

-   JSX

```
import './My.css';
<div className={'skyblue-background'}></div>;
```

<br>

### classnames 모듈

-   JSX

```
import './My.css'
import classNames from 'classnames'
<div className={classNames('skyblue-background')}></div>
<div className={classNames({skyblue-background: age % 2 === 0})}></div>

```

<br>

### clsx 모듈

-   JSX

```
import './My.css'
import clsx from 'clsx'
<div className={clsx('skyblue-background')}></div>
<div className={clsx({skyblue-background: age % 2 === 0})}></div>
```
