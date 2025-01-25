import { Link, useNavigate } from 'react-router';

import { useAuth } from "../hooks/AuthContext";


const NavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const IS_ADMIN = localStorage.getItem('role') === 'ADMIN'
  const links = [
    { label: 'Home', url: '/' },
    { label: 'Visualize', url: '/visualize' },
  ];
  IS_ADMIN && links.push(    
  { label: 'Health Check', url: '/table1' },
  { label: 'Table 2', url: '/table2' },
  { label: 'Table 3', url: '/table3' },
)
  const handleLogout = async () => {
    await logout();
    localStorage.clear()
    alert("You have been logged out!");
    navigate('/')
  };
  return (
    <div className="bg-white">
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
              className="h-auto w-72"
            />
            {/* <span className="ml-2 text-green-500">Vedanta</span> */}
          </a>

          <nav className="hidden gap-12 lg:flex">
            {links.map(({ label, url }) => (
             localStorage.getItem('auth') && <span key={url}>
               <Link
                to={url}
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
              >
                {label}{' '}
              </Link>
             </span>
            ))}
          </nav>

          <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
           <span
  className="inline-flex flex-col items-center gap-2 rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:text-indigo-500 focus-visible:ring active:text-indigo-600 md:text-base"
>
  {
    IS_ADMIN && <span className="inline-flex items-center rounded-md bg-yellow-50 text-center px-2 py-1 text-xs font-medium outline-none text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
    Admin
  </span>
  }
  {localStorage.getItem('auth') && (
    <span
      onClick={handleLogout}
      className="cursor-pointer inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"

    >
      Logout
    </span>
  )}
</span>


              {
                !localStorage.getItem('auth')  &&  <Link
                to="sign-up"
                className="inline-block rounded-lg py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base mr-4"
              >
                Sign up
              </Link>
              }
              {!localStorage.getItem('auth') &&<Link
              to={'/login'}
              className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:text-indigo-500 focus-visible:ring active:text-indigo-600 md:text-base"
            >
              Login
            </Link>}
           <a
            href="/"
            className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
            aria-label="logo"
          >
            <img
              src="https://mvsips.com/wp-content/uploads/2023/10/Logo.png"
              alt="Vedanta Logo"
              width="24"
              height="12"
              className="h-auto w-44"
            />
            {/* <span className="ml-2 text-green-500">Vedanta</span> */}
          </a>
           
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
