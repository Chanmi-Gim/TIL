import { useEffect } from 'react';
import { useFetch } from '../hooks/fetch-hooks';
import { useSession } from '../hooks/session-context';

const Profile = () => {
  console.log('@@@Profile');
  const {
    logout,
    session: { loginUser },
  } = useSession();

  const url = '/data/sample.json';
  const data = useFetch<Session>(url);
  useEffect(() => {
    if (data) console.log('profile-data: ', data);
  }, [data]);

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
