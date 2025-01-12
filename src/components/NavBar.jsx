import { Link, useNavigate } from 'react-router';
import { useAuth0 } from "@auth0/auth0-react";
import GoogleLogin from './GoogleLogin';
import { useAuth } from "../hooks/AuthContext";


const NavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { label: 'Home', url: '/' },
    { label: 'Table', url: '/table' },
    { label: 'Visualize', url: '/visualize' },
  ];
  const handleLogout = async () => {
    await logout();
    localStorage.clear()
    alert("You have been logged out!");
    navigate('/')
  };
  return (
    <div className="bg-white lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <header className="flex items-center justify-between py-4 md:py-8">
          <a
            href="/"
            className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
            aria-label="logo"
          >
            <img
              src="https://d1rbiogke1jwo5.cloudfront.net/wp-content/uploads/2021/12/Vedanta-Logo-PNG.png"
              alt="Vedanta Logo"
              width="95"
              height="94"
              className="h-auto w-80"
            />
            {/* <span className="ml-2 text-green-500">Vedanta</span> */}
          </a>

          <nav className="hidden gap-12 lg:flex">
            {links.map(({ label, url }) => (
             <span key={url}>
               <Link
                to={url}
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                {label}{' '}
              </Link>
             </span>
            ))}
            {/* <GoogleLogin /> */}
          </nav>

          <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
          {!localStorage.getItem('auth') &&<Link
              to={'/login'}
              className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:text-indigo-500 focus-visible:ring active:text-indigo-600 md:text-base"
            >
              Login
            </Link>}
            

              {localStorage.getItem('auth') && <a  
              onClick={handleLogout} 
              className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:text-indigo-500 focus-visible:ring active:text-indigo-600 md:text-base"
            >
              Logout
            </a>}
            

            <Link
              to="sign-up"
              className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
            >
              Sign up
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Menu
          </button>
        </header>
      </div>
    </div>
  );
};

export default NavBar;
