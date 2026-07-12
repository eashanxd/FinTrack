import { useState } from "react";
import "./Auth.css";
import InputField from "./InputField";
import PasswordInput from "./PasswordInput";
import SocialLoginButtons from "./SocialLoginButtons";
import { useAuth } from "../../contexts/AuthContext";

function RegisterForm({ onToggleMode }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (!agreeTerms) {
      setError("Please agree to the Terms & Conditions");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await register(email, password, fullName);

      if (result.success) {
        setSuccess(true);
        // Auto-redirect to dashboard after successful registration
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {success && (
        <div className="auth-success">
          Registration successful! Redirecting to your dashboard...
        </div>
      )}
      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}
      <InputField
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

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
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <label className="checkbox-label checkbox-terms">
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
          className="checkbox-input"
          required
        />
        <span className="checkbox-text">
          I agree to the <a href="#" className="terms-link">Terms & Conditions</a>
        </span>
      </label>

      <button type="submit" className="btn-primary btn-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create account"}
      </button>

      <div className="auth-divider">
        <span className="divider-line"></span>
        <span className="divider-text">OR</span>
        <span className="divider-line"></span>
      </div>

      <SocialLoginButtons />

      <div className="auth-footer">
        <span className="footer-text">Already have an account?</span>
        <button type="button" className="btn-link" onClick={onToggleMode}>
          Sign in
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
