

## Rounting

* `라우팅` : 사용자가 특정한 위치 또는 경로로 이동하거나 데이터를 전달하는 프로세스. 주로 URL을 이용하여 라우팅한다.
* `MVVR`(Model-View-ViewModel)에서의 라우팅: `ViewModel`이 라우팅한다. 
* `MVC`(Model-View-Controller)에서의 라우팅 : `Controller`가 라우팅한다.

<br>

## Intstall
```bash
yarn add react-router-dom
yarn add -D @types/react-router-dom
```

<br>

## react-router-dom

### **라우터 타입**
  - `BrowserRouter` : 일반적으로 사용하는 브라우저 라우터이다.
  - `HashRouter` : URL 뒤에 #을 사용하여 라우팅한다.(서버로 바로 안가게 해준다.)
  - `MemoryRouter` : 주소를 메모리에 저장하고 관리한다.
  - `NativeRouter` : React Native에서 사용하는 라우터이다.
  
<br>


### **페이지 라우팅** 
  ```tsx
  // app.tsx
  <Nav />
  <Routes>
    <Route path = '/' element= {<Home />} />
    <Route path = '*' element= {<NotFound />} />
  </Routes>
  ```  
  ```tsx
  //Nav.tsx
  <nav>
    <li><Link to='/'> Home </Link></li>
  </nav>
  ```  
  - **`Route` 컴포넌트**
  Routes 컴포넌트 내에서 Route 컴포넌트는 페이지 라우팅을 담당한다. path와 element 속성을 이용하여 경로와 해당 경로에 대한 컴포넌트를 매핑한다. (`nav`에서 보낸 `Link to`가 Route의 `path`(key)-`element`(value)로 보내진다.)
  - **nav의 `Link` 컴포넌트** : 페이지간의 링크를 생성한다.
    - `to` : 이동할 경로를 지정한다.
    - `state` : 경로 이동시, 전달 데이터를 설정한다.
    - `replace` : 이동 후 이전 페이지 제거해서 뒤로가기시 그 이전 페이지로 이동한다. 

- **nav의 `NavLink` 컴포넌트** : 페이지간의 링크를 생성한다.
    - `to` : 이동할 경로를 지정한다.
    - `state` : 경로 이동시, 전달 데이터를 설정한다.
    - `replace` : 이동 후 이전 페이지 제거해서 뒤로가기시 그 이전 페이지로 이동한다. 
    - `isActive`: 현재 경로와 `to` 속성이 일치하면 true를 반환하는 콜백 함수이다. 이를 이용해서 클릭한 경로에 대한 css파일 지정 가능!
    - `isPending`: 현재 네비게이션 요청이 진행 중이면 true를 반환한다.
    - `isTransitioning`: 페이지 전환 중에 true를 반환한다.
    
  ```jsx
  <NavLink to='/ttt' style={(obj) => obj.isActive ? { textDecoration: 'underline' } : {}}>TTT</NavLink>
  <NavLink to='/login' className={({ isActive }) => clsx({ bold: isActive })}> Login </NavLink>    
  ```

<br>


### **useNavigate()/Navigate**
  - `useNavigate()` : 동적인 라우팅 제어하는 훅. 호출되면 지정된 경로로 이동하는 네비게이션 함수를 반환한다.

    - `to` : 이동할 경로를 지정한다.
    - `state` : 경로 이동시, 전달 데이터를 설정한다.
    - `replace` : 이동 후 이전 페이지를 스택에서 제거하여 뒤로가기시 그 이전 페이지로 이동한다.
  
    ```javascript
    const navigate = useNavigate();
	useTimeout(() => navigate('./', { state: { a, b } }), 2000);
    ```
  
  - `Navigate` : `<Navivate to='/'>`로 바로 해당 경로로 이동가능하게 해주는 컴포넌트이다.
  
    ```javascript
    return <Navigate to='/Home' />;
    ```




<br>
  

> **파라미터(Parameter)**
> - URL에 포함되어 서버로 전달되는 값이다.
> - 일반적으로 주소 뒤에 ?를 붙이고, key=value 형태로 전달된다.
> - 여러 개의 파라미터를 전달할 때는 &로 구분합니다.
> - [ex]  `http://example.com/search?query=web&page=2`에서 query와 page가 파라미터


> **쿼리(Query):**
> - 쿼리는 데이터베이스에서 정보를 검색하거나 필터링할 때 사용되는 명령어이다.
> - 웹 개발에서는 대게 URL에 쿼리 스트링(query string)을 포함하여 서버에 특정 정보를 요청합니다.쿼리 스트링은 주소 뒤에 ?를 사용하며, 파라미터와 비슷한 형식으로 전달됩니다.
> [ex] `http://example.com/search?keyword=web&category=programming`에서 keyword와 category 쿼리


<br>




### **useParams()**
현재 경로의 `파라미터`를 가져온다.
- [ex] 현재 경로가 "/users/`123`"이라면 id 변수에는 "`123`"이 할당된다.
  ```javascript
  const { id } = useParams();
  console.log(id);
  ```
    > **브라우저에서 `window.location`**: host(도메인), pathname(경로), search(쿼리) 등 확인가능
    > **리액트의 `useLocation()`** : window.location의 `pathname`(경로),`search`(query),`state`(전달데이터) 등 반환

  
<br>
  

### **useSearchParams()**
검색 파라미터 관리 훅 

```javascript
const [searchParams, setSearchParams] = useSearchParams({});
```
   - `searchParams`: 현재 URL의 검색 파라미터를 나타내는 객체
   - `setSearchParams`: 검색 파라미터를 업데이트하는 함수

