import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/UseAuth";
const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY;
console.log(image_hosting_key)
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`
console.log(image_hosting_api)
const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = UseAxiosPublic()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {createUser,updateUserProfile} = useAuth(AuthContext)

  const onSubmit = async (data) => {
    try {
      console.log(data);
  
      const email = data.email;
      const password = data.password;
      const role = data.role;
      console.log(role)
  
      // Create user
      const user = await createUser(email, password);
      console.log('User created:', user);
  
      // Upload image only if user creation is successful
      if (user) {
        // Upload image to imgbb and get URL
        const formData = new FormData();
        formData.append('image', data.photo[0]);
  
        const res = await axiosPublic.post(image_hosting_api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log('Image upload response:', res.data);
  
        const photoUrl = res.data.data.display_url;
  
        // Update user profile with photo URL
        await updateUserProfile(email, photoUrl);
        toast.success('Signed Up successfully');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('Error during signup. Please try again later.');
    }
  };
  

  return (
    <div>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
        <div className="bg-[#f0ece9] rounded-2xl flex max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8">
            <h2 className="font-bold text-center text-5xl text-[#7600dc]">
              Sign Up
            </h2>
            <p className="opacity-75 font-semibold mt-4">
              If you are not a member yet, easily sign up in now.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <input
                {...register("email", { required: true })}
                className="p-2 mt-8 rounded-xl border"
                type="email"
                placeholder="Email"
              />
              {errors.email && <span className="text-red-500">Email is required</span>}
              <input
                {...register("photo", { required: true })}
                className="p-2 mt-8 rounded-xl border"
                type="file"
                accept="image/*"
                placeholder="photo"
              />
              {errors.email && <span className="text-red-500">Email is required</span>}

              <select defaultValue='default' {...register("role")} className="p-2 rounded-xl border">
                <option disabled value="default" defaultValue>Select your role</option>
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>

              <div className="relative">
                <input
                  {...register("password", { required: true })}
                  className="p-2 rounded-xl border w-full"
                  type={showPassword ? "text" : "password"}
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
              {errors.password && <span className="text-red-500">Password is required</span>}
              <button
                className="bg-[#7600dc] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#a247f1] font-medium"
                type="submit"
              >
                Sign Up
              </button>
            </form>
            <div className="mt-6 items-center text-gray-100">
              <hr className="border-gray-300" />
              <p className="text-center text-gray-500 font-black text-sm">OR</p>
              <hr className="border-gray-300" />
            </div>
            <button
              className="bg-white gap-2 border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#7600dc] font-medium"
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
              <span className="font-bold text-xl opacity-75 font-nunito">
                Login with Google
              </span>
            </button>

            <div className="mt-6 text-sm flex justify-between items-center container-mr">
              <p className="mr-3 font-semibold opacity-75 md:mr-0 ">
                If you are already a member, easily sign in here...
              </p>
              <Link
                to="/login"
                className="hover:border register text-white bg-[#7600dc] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#00157424] font-semibold duration-300"
              >
                Login
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

export default SignUp;
