import { useContext } from 'react';
import UserContext from '../comps/auth/UserContext';
import UnauthenticatedHome from '../comps/home/UnauthenticatedHome';
import UserHome from '../comps/home/UserHome';

export default function Home() {
    const user = useContext(UserContext);
    return user.signedIn ? <UserHome /> : <UnauthenticatedHome />;
}
