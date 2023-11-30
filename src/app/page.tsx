import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="text-center px-6 py-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to SpeedCat</h1>
        <p className="text-lg text-gray-600 mb-8">Join us to explore exciting features!</p>
        
        <div className="flex gap-4 justify-center">
        <Link href="/signup" legacyBehavior>
  <a className="m-9 transition duration-300 ease-in-out bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none">
    Sign Up
  </a>
</Link>
<Link href="/login" legacyBehavior>
  <a className="transition duration-300 ease-in-out bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none">
    Log In
  </a>
</Link>

        </div>
      </div>
      
      <div className="mt-6">
      </div>
    </div>
  );
}
