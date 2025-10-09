import { useEffect, useState } from 'react';
import { FaHamburger } from 'react-icons/fa';
import { IoCloseCircle, IoHammer, IoHomeOutline } from 'react-icons/io5';
import { Link } from 'react-router';
import Logout from './Logout';

const Sidebar = ({ isLogedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    console.log('diklik');
    setIsOpen(!isOpen);
  };
  const isActive = isOpen ? 'left-0' : '-left-96';

  return (
    <>
      {isLogedIn && (
        <div className="z-90 sticky top-0">
          <div onClick={handleClick} className="bg-gray-400 rounded-tr-xl rounded-bl-xl backdrop-blur-2xl p-2 right-5 top-3 absolute">
            <i className="text-teal-700 text-xl  md:text-3xl">
              <FaHamburger />
            </i>
          </div>
          <div className={`${isActive} transition-all duration-300 ease-in-out text-white py-5 flex flex-col items-start justify-between absolute bg-teal-700 h-screen px-11`}>
            <div onClick={handleClick} className="right-1 top-1 absolute">
              <i className="text-3xl text-red-600 hover:text-red-700 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-200">
                <IoCloseCircle />
              </i>
            </div>
            <div className="flex h-full justify-between items-center flex-col">
              <div>
                <div className="logo mt-5 flex justify-center items-center">
                  <h1 className="font-bold text-2xl">ADMIN</h1>
                </div>
                <div className="menu mt-5">
                  <ul className="flex flex-col gap-5">
                    <Link to="admin/dashboard" className="flex items-center gap-2">
                      <i className="text-2xl">
                        <IoHomeOutline />
                      </i>
                      <span>Dashboard</span>
                    </Link>
                    <Link to="admin/dashboard" className="flex items-center gap-2">
                      <i className="text-2xl">
                        <IoHomeOutline />
                      </i>
                      <span>Dashboard</span>
                    </Link>
                    <Link to="admin/dashboard" className="flex items-center gap-2">
                      <i className="text-2xl">
                        <IoHomeOutline />
                      </i>
                      <span>Dashboard</span>
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="w-full">
                <Logout />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
