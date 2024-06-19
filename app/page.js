// 'use client';

// import { useEffect, useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from './firebase/config'; // Adjust this import based on your firebase configuration
// import { useRouter } from 'next/navigation';
// import { signOut } from 'firebase/auth';
// import { FaPlusCircle, FaQuestionCircle, FaPhone, FaSignOutAlt } from 'react-icons/fa'; // Importing icons
// import Link from 'next/link';
// const Home = () => {
//   const router = useRouter();
//   const [user, loading, error] = useAuthState(auth);
//   const [userSession, setUserSession] = useState(null);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true); // Ensure this runs only on the client side
//   }, []);

//   useEffect(() => {
//     const storedUser = sessionStorage.getItem('user');
//     if (storedUser) {
//       setUserSession(storedUser);
//     }
//   }, []);

//   useEffect(() => {
//     if (isClient && !loading) {
//       if (!user && !userSession) {
//         router.push('/signin');
//       }
//     }
//   }, [loading, user, userSession, router, isClient]);

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       sessionStorage.removeItem('user');
//       router.push('/signin'); // Redirect to sign-in page after sign-out
//     } catch (error) {
//       console.error('Sign out error', error);
//       // Handle error state or feedback to user
//     }
//   };

//   if (loading || !isClient) {
//     return <p>Loading...</p>; // Handle loading state while authentication state is being fetched
//   }

//   if (!user && !userSession) {
//     return null; // Prevent rendering if the user is not authenticated
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white p-4">
//       <div className="w-full max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg">
//         <div className="bg-blue-600 py-6 rounded-t-lg">
//           <h1 className="text-3xl font-bold text-center">Insurance Claim</h1>
//         </div>
//         <div className="bg-white py-8 px-6 rounded-b-lg text-center">
//           <h2 className="text-2xl font-semibold mb-6 text-gray-800">Welcome {user ? user.displayName : 'Guest'}!</h2>
//           <div className="space-y-6">
//             <Link href="/Details-entry" passHref>
//               <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400">
//                 <FaPlusCircle className="mr-2" />
//                 New claim
//               </button>
//             </Link>
//             <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400">
//               <FaQuestionCircle className="mr-2" />
//               Get assistance
//             </button>
//             <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400">
//               <FaPhone className="mr-2" />
//               Contact
//             </button>
//             {user && (
//               <button
//                 onClick={handleSignOut}
//                 className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500"
//               >
//                 <FaSignOutAlt className="mr-2" />
//                 Sign Out
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


'use client';
// pages/dashboard.js// pages/dashboard.js

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from './hooks';

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('home');
  const { role, signOutUser } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <nav className="mt-6">
          <ul>
            <li className={`p-4 hover:bg-gray-700 ${activeNav === 'home' && 'bg-gray-700'}`}>
              <Link href="/dashboard" onClick={() => setActiveNav('home')}>Home</Link>
            </li>
            <li className={`p-4 hover:bg-gray-700 ${activeNav === 'profile' && 'bg-gray-700'}`}>
              <Link href="/dashboard/profile" onClick={() => setActiveNav('profile')}>Profile</Link>
            </li>
            {role === 'admin' && (
              <li className={`p-4 hover:bg-gray-700 ${activeNav === 'admin' && 'bg-gray-700'}`}>
                <Link href="/dashboard/admin" onClick={() => setActiveNav('admin')}>Admin</Link>
              </li>
            )}
            {role === 'user' && (
              <li className={`p-4 hover:bg-gray-700 ${activeNav === 'user-settings' && 'bg-gray-700'}`}>
                <Link href="/dashboard/settings" onClick={() => setActiveNav('user-settings')}>Settings</Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="p-6">
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 bg-black-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
        <div className="bg-black p-6 rounded-lg shadow-md">
          <p>This is the home page of your dashboard. You can add more content here.</p>
        </div>
      </main>
    </div>
  );
}
