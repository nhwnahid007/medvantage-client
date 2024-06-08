import axios from "axios";
import useAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const UseAxiosSecure = () => {
  const {logOut}= useAuth()
  const navigate = useNavigate()

  axiosSecure.interceptors.request.use(function(config){
    const token = localStorage.getItem('access-token')
    console.log('request stopped by interceptors',token)
    config.headers.authorization = `Bearer ${token}`
    return config
  },function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  } )

    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
      return response;
  }, async (error) => {
      const status = error.response.status;
      console.log('status error in the interceptor', status);
      // for 401 or 403 logout the user and move the user to the login
      if (status === 401 || status === 403) {
          await logOut();
          navigate('/login');
      }
      return Promise.reject(error);
  })


  return axiosSecure;
};

export default UseAxiosSecure;
