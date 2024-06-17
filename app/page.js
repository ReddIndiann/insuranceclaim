'use client';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config'; // Adjust this import based on your firebase configuration
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { FaPlusCircle, FaQuestionCircle, FaPhone, FaSignOutAlt } from 'react-icons/fa'; // Importing icons

const Home = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This code will only run on the client
      const storedUser = sessionStorage.getItem('user');
      setUserSession(storedUser);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user && !userSession) {
        router.push('/signin');
      } else if (!user) {
        router.push('/signin');
      }
    }
  }, [loading, user, userSession, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('user');
      router.push('/signin'); // Redirect to sign-in page after sign-out
    } catch (error) {
      console.error('Sign out error', error);
      // Handle error state or feedback to user
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Handle loading state while authentication state is being fetched
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white p-4">
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg">
        <div className="bg-blue-600 py-6 rounded-t-lg">
          <h1 className="text-3xl font-bold text-center">Shift</h1>
        </div>
        <div className="bg-white py-8 px-6 rounded-b-lg text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Welcome {user ? user.displayName : 'Guest'}!</h2>
          <div className="space-y-6">
          <Link href="/Details-entry" passHref>
            <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400">
              <FaPlusCircle className="mr-2" />
              New claim
            </button>
            </Link>
            <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400">
              <FaQuestionCircle className="mr-2" />
              Get assistance
            </button>
            <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400">
              <FaPhone className="mr-2" />
              Contact
            </button>
            {user && (
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
