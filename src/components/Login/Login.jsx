import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../constant";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { data, loading } = useFetch(BASE_URL + "/users");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    const findItem = data.find(
      (item) =>
        item.email == e.target.email.value &&
        item.password == e.target.password.value
    );
    if (findItem) {
      localStorage.setItem("login",'true');
      navigate('/bookmark')
    }else{
      toast.error('user is not defind')
    }
  };

  console.log({ data });

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}
export default Login;
