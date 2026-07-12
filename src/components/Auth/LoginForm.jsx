import { useState } from "react";
import "./Auth.css";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import SocialLoginButtons from "./SocialLoginButtons";
import { useAuth } from "../../contexts/AuthContext";

function LoginForm({ onToggleMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const result = await login(email, password);

      if (!result.success) {
        setError(result.error || "Unable to sign in. Please try again.");
      }
      // If successful, AuthContext will handle the redirect automatically
    } catch (err) {
      setError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}
      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="auth-options">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="checkbox-input"
          />
          <span className="checkbox-text">Remember me</span>
        </label>
        <a href="#" className="forgot-password">Forgot password?</a>
      </div>

      <button type="submit" className="btn-primary btn-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </button>

      <div className="auth-divider">
        <span className="divider-line"></span>
        <span className="divider-text">OR</span>
        <span className="divider-line"></span>
      </div>

      <SocialLoginButtons />

      <div className="auth-footer">
        <span className="footer-text">Don't have an account?</span>
        <button type="button" className="btn-link" onClick={onToggleMode}>
          Sign up
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
