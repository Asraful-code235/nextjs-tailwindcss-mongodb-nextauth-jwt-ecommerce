import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { Store } from '../utils/Store';
import { signOut, useSession } from 'next-auth/react';
import Cookies from 'js-cookie';

const Navbar = () => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemscount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={'/'} className="btn btn-ghost normal-case text-xl">
            Ecomi
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <Link href={'/cart'}>
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span
                    className={`badge badge-sm ${
                      cartItemscount > 0 ? '' : 'bg-white border-none'
                    }  indicator-item !text-white`}
                  >
                    {cartItemscount > 0 && (
                      <span>
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </span>
                    )}
                  </span>
                </div>
              </Link>
            </label>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className=" flex items-center  ">
              <div className=" rounded-lg px-4 py-3 bg-slate-500 text-white">
                {status === 'loading' ? (
                  'loading'
                ) : session?.user ? (
                  session.user.name
                ) : (
                  <Link href={'/login'}>Login</Link>
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a href="#" onClick={logoutClickHandler}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
