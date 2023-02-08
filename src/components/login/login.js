import styles from "./login.css";

function Login() {
  const userLogin = () => {
    alert("tried to login");
  };
  return (
    <div className="login-container">
      <label for="user-email">Email</label>
      <input type="email" id="user-email" />
      <label for="user-password">Password</label>
      <input type="password" id="user-password" />

      <div onClick={userLogin} className="login-submit">
        submit
      </div>
    </div>
  );
}

export default Login;
