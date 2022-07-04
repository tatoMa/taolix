import { getProviders, signIn, getSession } from "next-auth/react";

function signin({ providers }) {
  return (
    <div className="flex h-screen w-screen items-center">
      <div className="mx-auto flex w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800 sm:max-w-4xl">
        <img
          className="hidden object-cover sm:block sm:w-1/2"
          src="/auth_pic.jpg"
        ></img>

        <div className="w-full px-6 py-8 sm:w-1/2 md:px-8">
          <img
            src="/favicon-32x32.png"
            alt="TAOLIX"
            className="mx-auto mb-1 h-11"
          />
          <h2 className=" text-center text-2xl font-semibold text-gray-700 dark:text-white">
            TAOLIX
          </h2>

          <p className="text-center text-xl text-gray-600 dark:text-gray-200">
            Blazing fast online stream service
          </p>

          <button
            onClick={() => signIn("google")}
            className="mt-4 flex w-full transform items-center justify-center rounded-lg border text-gray-600 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <div className="px-4 py-2">
              <svg className="h-6 w-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <span className="w-5/6 px-4 py-3 text-center font-bold">
              Sign in with Google
            </span>
          </button>

          <div className="mt-4 flex items-center justify-between">
            <span className="w-1/5 border-b dark:border-gray-600 sm:w-1/4"></span>

            <a
              href="#"
              className="text-center text-xs uppercase text-gray-500 hover:underline dark:text-gray-400"
            >
              or login with email
            </a>

            <span className="w-1/5 border-b dark:border-gray-400 sm:w-1/4"></span>
          </div>

          <div className="mt-4">
            <label
              className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              className="block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
              type="email"
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="loggingPassword"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-gray-500 hover:underline dark:text-gray-300"
              >
                Forget Password?
              </a>
            </div>

            <input
              id="loggingPassword"
              className="block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
              type="password"
            />
          </div>

          <div className="mt-8">
            <button className="w-full transform rounded bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
              Login
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <a
              href="#"
              className="text-xs uppercase text-gray-500 hover:underline dark:text-gray-400"
            >
              or sign up
            </a>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default signin;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  const providers = await getProviders();

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  return {
    props: { providers },
  };
}
