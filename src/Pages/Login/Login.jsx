import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/UseAuth";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, googleSignIn } = useAuth(AuthContext);

  
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log('state in the location login page', location.state)
  console.log('location in the state on login page',location.state)


  const axiosPublic = UseAxiosPublic();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    console.log(data);

    try {
      console.log(data);

      const email = data.email;
      const password = data.password;

      // login user
      const user = await signIn(email, password);
      console.log("User Logged In:", user);
      navigate(from);
      toast.success("Sign In Successfully");

      // Upload image only if user creation is successful
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Error during signup. Please try again later.");
    }
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async (res) => {
        console.log(res.user);
        const role = "user";
        const name = res.user.displayName;
        const email = res.user.email;
        const photoUrl = res.user.photoURL;

        const googleInfo = {
          name,
          email,
          role,
          photoUrl,
        };
        const userRes = await axiosPublic.put("/users", googleInfo);
        console.log(userRes);

        console.log(googleInfo);
        navigate(from);
        toast.success("Sign in successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
        <div className="bg-[#f0ece9] rounded-2xl flex max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8">
            <h2 className="font-bold text-center text-5xl text-[#7600dc]">
              Login
            </h2>
            <p className="opacity-75 font-semibold mt-4">
              If you are already a member, easily log in now.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <input
                {...register("email", { required: true })}
                className="p-2 mt-8 rounded-xl border"
                type="email"
                name="email"
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
              <div className="relative">
                <input
                  {...register("password", { required: true })}
                  className="p-2 rounded-xl border w-full"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute top-2 right-3 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-6 w-6 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEye className="h-6 w-6 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
              <button
                className="bg-[#7600dc] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#a247f1] font-medium"
                type="submit"
              >
                Login
              </button>
            </form>
            <div className="mt-6 items-center text-gray-100">
              <hr className="border-gray-300" />
              <p className="text-center text-gray-500 font-black text-sm">OR</p>
              <hr className="border-gray-300" />
            </div>
            <button
              onClick={handleGoogleSignIn}
              className="bg-white gap-2 border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium"
              aria-label="Login with Google"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="0.98em"
                height="1em"
                viewBox="0 0 256 262"
              >
                <path
                  fill="#4285f4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                />
                <path
                  fill="#34a853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                />
                <path
                  fill="#fbbc05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                />
                <path
                  fill="#eb4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                />
              </svg>
              <span className="font-bold text-xl font-nunito">
                Login with Google
              </span>
            </button>

            <div className="mt-6 text-sm flex justify-between items-center container-mr">
              <p className="mr-3 md:mr-0 ">
                If you don&apos;t have an account..
              </p>
              <Link
                to="/signUp"
                className="hover:border register text-white bg-[#7600dc] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl max-h-[1600px]"
              src="https://i.ibb.co/z5wkkFg/medvantage.jpg"
              alt="Login form"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
