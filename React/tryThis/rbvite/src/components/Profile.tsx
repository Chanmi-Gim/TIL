import { useSession } from '../hooks/session-context';

const Profile = () => {
  console.log('@@@Profile');
  const {
    logout,
    session: { loginUser },
  } = useSession();
  return (
    <>
      <div>
        {' '}
        유저이름: {loginUser?.name}
        <small>({loginUser?.id})</small>
      </div>
      <button onClick={logout}>Logout</button>
    </>
  );
};
export default Profile;
