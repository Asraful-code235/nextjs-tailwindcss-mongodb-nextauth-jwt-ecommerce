import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const LoginScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = ({ phone, password }) => {
    console.log(phone, password);
  };
  return (
    <Layout title="Login">
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
