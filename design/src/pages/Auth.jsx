import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const users =
  JSON.parse(localStorage.getItem("users")) || [];

const account = users.find(
  (u) => u.email === email
);

if (!account) {
  toast.error(
    "No account found. Please create an account first."
  );
  return;
}

if (account.password !== password) {
  toast.error("Incorrect password.");
  return;
}

login(account);

toast.success(`Welcome back, ${account.name}!`);

navigate("/profile");
    } else {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      const users =
        JSON.parse(localStorage.getItem("users")) || [];

      const exists = users.find(
        (u) => u.email === email
      );

      if (exists) {
        toast.error(
          "Email already registered."
        );
        return;
      }

      const newUser = {
        id: crypto.randomUUID(),
        name,
        email,
        password,
      };

      localStorage.setItem(
        "users",
        JSON.stringify([...users, newUser])
      );

      toast.success(
        "Account created successfully."
      );

      login(newUser);

      navigate("/profile");
    }
  };

  return (
    <div className="auth-page">
  <div className="auth-visual">
    <div className="auth-overlay">
      <p>STRUT & SUBSTANCE</p>
      <h2>
        Quiet Luxury.
        <br />
        Timeless Identity.
      </h2>
    </div>
  </div>

  <div className="auth-content">
      <div className="auth-card">
      

        <div className="auth-switch">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>

          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Create Account
          </button>
        </div>
<p className="auth-tag">
Maison Access
</p>

        <h1>
          {isLogin
            ? "Welcome Back"
            : "Join Strut & Substance"}
        </h1>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          {!isLogin && (
            <div className="field">
              <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              />
              </div>
          )}
<div className="field">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />
</div>
<div className="field">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />
</div>
<div className="field">
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              required
            />
          )}
          </div>

          <button type="submit">
            {isLogin
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>
      </div>
    </div>
    </div>
     
     
  );
}

export default Auth;