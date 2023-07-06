import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Error from "../Components/Error";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { state: locationState } = useLocation();
  const navigate = useNavigate();
  const { googleLogin, loginUser, setUserRole } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    googleLogin(navigate, locationState);
    console.log(locationState);
  };
  const handleEmailPassLogin = async () => {
    console.log("loginsjflds", email, password);
    try {
      const result = await loginUser(email, password);
      const user = result?.user;
      console.log(user);
      if (user?.email) {
        setError("");
        const response = await axios.get(
          `https://lanuage.onrender.com/user/${user?.email}`
        );
        if (response?.data?.email) {
          setUserRole(response.data?.role);
        }
        navigate(locationState ? locationState?.from : "/");
      }
    } catch (error) {
      console.log(error);
      setError(error?.message);
    }
  };
  console.log(locationState);
  return (
    <div className="mt-20">
      <div className="w-full max-w-md p-4 rounded-md h-auto shadow sm:p-8 bg-gray-900 text-gray-100 mx-auto ">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Login to your account
        </h2>
        <p className="text-sm text-center text-gray-400">
          Dont have account?
          <Link
            to={"/registration"}
            className="focus:underline hover:underline"
          >
            Sign up here
          </Link>
        </p>

        <form
          action=""
          className="space-y-8 ng-untouched ng-pristine ng-valid mt-3"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline text-gray-400"
                >
                  Forgot password?
                </a>
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
              />
            </div>
          </div>
          <button
            onClick={handleEmailPassLogin}
            type="button"
            className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900"
          >
            Sign in
          </button>
        </form>
        <div className="mt-4">
          {error.length > 0 && <Error message={error} />}
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-gray-400" />
          <p className="px-3 text-gray-400">OR</p>
          <hr className="w-full text-gray-400" />
        </div>
        <div className="my-6 space-y-4">
          <button
            onClick={handleGoogleLogin}
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-400 focus:ring-violet-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
