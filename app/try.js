'use client';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config'; // Adjust this import based on your firebase configuration
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

const Home = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // This code will only run on the client
      const storedUser = sessionStorage.getItem('user');
      setUserSession(storedUser);
      if (!user && !storedUser) {
        router.push('signup');
      }
    }
  }, [user, router]);

  useEffect(() => {
    // Redirect to sign-in page if user is not authenticated
    if (!loading && !user) {
      router.push('/signin'); // Replace with the actual path to your sign-in page
    }
  }, [loading, user, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('user');
      router.push('/'); // Redirect to home or sign-in page after sign-out
    } catch (error) {
      console.error('Sign out error', error);
      // Handle error state or feedback to user
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Handle loading state while authentication state is being fetched
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Insurance Claim Detection</h1>
        {user && (
          <div className="text-center">
            <p className="text-white">Welcome, {user.email}</p>
            <button
              onClick={handleSignOut}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
