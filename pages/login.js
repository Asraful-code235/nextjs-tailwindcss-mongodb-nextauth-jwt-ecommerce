import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { getError } from '../utils/error';
import { useRouter } from 'next/router';

const LoginScreen = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [redirect, router, session?.user]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ phone, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        phone,
        password,
      });
      if (result.error) {
        alert(result.error);
      }
    } catch (err) {
      alert(getError(err));
    }
  };
  return (
    <Layout title="Login">
      <div className="flex bg-red-200 mb-4 flex-col justify-center items-center  w-full ">
        <h1 className="text-2xl font-bold">
          Use the phone and password as : [8801685478954,123456]
        </h1>
        <p>
          The above mentioned is so that you can gain access to the database and
          is only for testing purpose.
        </p>
        <p>
          You can register new user but they wont have access to the dashboard
          as it is a protected route
        </p>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mx-auto max-w-screen-md"
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="phone">Phone</label>
          <input
            {...register('phone', { required: 'Please enter your phone' })}
            type="number"
            className="w-full input input-bordered "
            id="phone"
            autoFocus
            maxLength={14}
            placeholder="Phone No"
            defaultValue={'+880'}
          />
          {errors.phone && (
            <div className="text-red-500 my-2 font-semibold p-4 w-full bg-red-200">
              {errors.phone.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more then 5 char' },
            })}
            type="text"
            className="w-full input input-bordered "
            id="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <div className="text-red-500 my-2 font-semibold p-4 w-full bg-red-200">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="mb-4">
          <button className="btn btn-primary ">Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account?
          <Link href={'/register'}>Register</Link>
        </div>
      </form>
    </Layout>
  );
};

export default LoginScreen;
