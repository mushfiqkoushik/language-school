import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import Error from "../Components/Error";
import { useForm } from "react-hook-form";
import axios from "axios";
const Registration = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { registerUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const email = data?.email;
    const password = data?.password;
    const result = await registerUser(email, password);
    const user = result?.user;
    console.log(user);

    if (user?.email) {
      const userData = {
        name: data?.name,
        email: data?.email,
        photoUrl: data?.image,
        role: "student",
      };
      const response = await axios.post(
        "https://lanuage.onrender.com/create-user",
        userData
      );
      navigate("/");
      setError("");
    }
  };

  return (
    <div className="w-full mt-10 max-w-md p-4 rounded-md shadow sm:p-8 bg-gray-900 text-gray-100 mx-auto ">
      <h2 className="mb-3 text-3xl font-semibold text-center">
        Create an account
      </h2>
      <p className="text-sm text-center text-gray-400">
        Already have account?
        <Link to={"/login"} className="focus:underline hover:underline">
          Login
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              // onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm">
              Image Url
            </label>
            <input
              {...register("image", { required: true })}
              // onChange={(e) => setEmail(e.target.value)}
              type="url"
              name="image"
              id="image"
              placeholder="http://"
              className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm">
              Email address
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              required
              placeholder="leroy@jenkins.com"
              className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
            </div>
            <input
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                  message:
                    "Password must have at least 6 characters, an uppercase letter, and a special character",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
              type="password"
              name="password"
              id="password"
              required
              placeholder="*****"
              className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-violet-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900 mt-4"
        >
          Sign Up
        </button>
      </form>
      <div className="mt-4">
        {error.length > 0 && <Error message={error} />}
        {errors.password && <Error message={errors.password?.message} />}
      </div>
    </div>
  );
};

export default Registration;
