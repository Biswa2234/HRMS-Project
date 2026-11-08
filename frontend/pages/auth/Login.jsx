import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../src/api/auth.api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (loading) return;

    try {
      setLoading(true);

      const response = await loginUser({
        email: email.trim(),
        password,
      });

      // Match the actual backend response structure
      const token =
        response?.data?.accessToken ??
        response?.accessToken ??
        response?.data?.token ??
        response?.token;

      if (!token) {
        throw new Error("Login response did not contain an access token.");
      }

      localStorage.setItem("token", token);

      if (response?.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else if (response?.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Unable to connect to server. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#7191e7]">
      {/* Background */}
      <div className="absolute -left-45 top-51.25 h-57.5 w-212.5 rotate-[8deg] rounded-[100px] bg-[#5778dc]/65" />

      <div className="absolute -right-87.5 top-62.5 h-42.5 w-300 rotate-[-7deg] rounded-[100px] bg-[#7593e6]/65" />

      <div className="absolute bottom-[-580px] left-[250px] h-[720px] w-[720px] rounded-full bg-[#5678da]/75" />

      <div className="absolute -right-[220px] -top-[350px] h-[720px] w-[300px] -rotate-[7deg] rounded-[100px] bg-[#6d8de5]/70" />

      <div className="absolute right-[20px] -top-[250px] h-[650px] w-[280px] -rotate-[7deg] rounded-[100px] bg-[#5b7edd]/50" />

      <div className="absolute -bottom-7.5 -left-62.5 h-[230px] w-[650px] rotate-[10deg] rounded-[100px] bg-[#6385e2]/70" />

      {/* Login Card */}
      <div
        className="
          relative z-10 flex min-h-118.75 w-237.5
          flex-col items-center rounded-2xl
          bg-[#1e48be]/90 px-5 pb-8 pt-20.5
          shadow-[0_10px_30px_rgba(20,50,130,0.35)]
          max-[700px]:w-[92%] max-[700px]:pt-16.25
        "
      >
        {/* Cart Icon */}
        <div className="mb-9.5 flex h-20.5 w-20.5 items-center justify-center max-[700px]:mb-7.5">
          <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-19 w-[76px]"
            aria-hidden="true"
          >
            <path
              d="M18 25H27L34 53H59L66 29H31"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="38" cy="62" r="4" stroke="white" strokeWidth="2.5" />
            <circle cx="57" cy="62" r="4" stroke="white" strokeWidth="2.5" />

            <path
              d="M49 34V9"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              d="M42 16L49 9L56 16"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-56"
          noValidate={false}
        >
          {/* Email */}
          <div
            className="
              mb-3.25 flex h-10 w-full items-center
              rounded-[3px] border border-white/70
              bg-transparent focus-within:border-white
            "
          >
            <div className="flex w-9 items-center justify-center text-white/65">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-3.75 w-[15px]"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7L12 13L21 7" />
              </svg>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              required
              aria-label="Email address"
              className="
                h-full min-w-0 flex-1 bg-transparent pr-2
                text-[12px] text-white outline-none
                placeholder:text-white/55 placeholder:uppercase
              "
            />
          </div>

          {/* Password */}
          <div
            className="
    mb-[13px] flex h-[40px] w-full items-center
    rounded-[3px] border border-white/70
    bg-transparent focus-within:border-white
  "
          >
            <div className="flex w-[36px] items-center justify-center text-white/65">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-[15px] w-[15px]"
                aria-hidden="true"
              >
                <rect x="5" y="10" width="14" height="10" rx="1.5" />
                <path d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10" />
              </svg>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              aria-label="Password"
              className="
      h-full min-w-0 flex-1 bg-transparent pr-2
      text-[12px] text-white outline-none
      placeholder:text-white/55 placeholder:uppercase
    "
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="flex h-full w-9 shrink-0 items-center justify-center text-white/65 hover:text-white"
            >
              {showPassword ? (
                // Eye-off icon
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4.25 w-4.25"
                  aria-hidden="true"
                >
                  <path d="M3 3L21 21" />
                  <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                  <path d="M9.9 5.2A11.5 11.5 0 0 1 12 5c5 0 8.5 4.5 9.5 7-.4 1-1.3 2.4-2.7 3.7" />
                  <path d="M6.2 6.2C3.9 7.7 2.8 10 2.5 12c1 2.5 4.5 7 9.5 7 1.2 0 2.3-.3 3.3-.7" />
                </svg>
              ) : (
                // Eye icon
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-[17px] w-[17px]"
                  aria-hidden="true"
                >
                  <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              aria-live="polite"
              className="mb-3 text-center text-xs text-red-100"
            >
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              mt-[18px] h-[38px] w-full rounded-[3px]
              bg-white text-[11px] font-bold text-[#3154ae]
              shadow-[0_3px_6px_rgba(0,0,0,0.18)]
              transition duration-200 hover:-translate-y-[1px]
              hover:bg-gray-100 active:translate-y-0
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>

          {/* Register */}
          <button
            type="button"
            onClick={() => navigate("/register")}
            disabled={loading}
            className="
              mt-4.5 h-9.5 w-full rounded-[3px]
              bg-white text-[11px] font-bold text-[#3154ae]
              shadow-[0_3px_6px_rgba(0,0,0,0.18)]
              transition duration-200 hover:-translate-y-[1px]
              hover:bg-gray-100 active:translate-y-0
              disabled:opacity-60
            "
          >
            NEW USER? REGISTER
          </button>

          {/* Forgot Password */}
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            disabled={loading}
            className="
              mt-3.5 block w-full bg-transparent
              text-center text-[12px] text-white/90
              hover:text-white hover:underline
              disabled:opacity-60
            "
          >
            Forgot password?
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
