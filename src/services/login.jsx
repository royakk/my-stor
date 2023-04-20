import axios from "axios";
function Login(user) {
    return axios.post('https://fakestoreapi.com/auth/login',user);
  }
  export default{
Login
  }