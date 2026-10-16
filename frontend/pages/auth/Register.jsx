import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const payload = {
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    console.log("Register Payload:", payload);

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log("Register Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful!");

      navigate("/login");
    } catch (error) {
      console.error("Register Error:", error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#7191e7]">
      {/* Background */}
      <div className="absolute -left-[180px] top-[205px] h-[230px] w-[850px] rotate-[8deg] rounded-[100px] bg-[#5778dc]/65" />

      <div className="absolute -right-[350px] top-[250px] h-[170px] w-[1200px] -rotate-[7deg] rounded-[100px] bg-[#7593e6]/65" />

      <div className="absolute bottom-[-580px] left-[250px] h-[720px] w-[720px] rounded-full bg-[#5678da]/75" />

      <div className="absolute -right-[220px] -top-[350px] h-[720px] w-[300px] -rotate-[7deg] rounded-[100px] bg-[#6d8de5]/70" />

      <div className="absolute right-[20px] -top-[250px] h-[650px] w-[280px] -rotate-[7deg] rounded-[100px] bg-[#5b7edd]/50" />

      <div className="absolute -bottom-[30px] -left-[250px] h-[230px] w-[650px] rotate-[10deg] rounded-[100px] bg-[#6385e2]/70" />

      {/* Register Card */}
      <div
        className="
          relative z-10
          flex min-h-[570px] w-[950px]
          flex-col items-center
          rounded-[16px]
          bg-[#1e48be]/90
          pt-[42px]
          pb-[40px]
          shadow-[0_10px_30px_rgba(20,50,130,0.35)]
          max-[700px]:w-[92%]
          max-[700px]:pt-[35px]
        "
      >
        {/* Icon */}
        <div className="mb-[15px] flex h-[60px] w-[60px] items-center justify-center">
          <svg viewBox="0 0 80 80" fill="none" className="h-[55px] w-[55px]">
            <circle cx="40" cy="27" r="11" stroke="white" strokeWidth="3" />

            <path
              d="M20 66C21.5 51 28 44 40 44C52 44 58.5 51 60 66"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              d="M62 12V28"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              d="M54 20H70"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="mb-[4px] text-[19px] font-bold uppercase text-white">
          Create Account
        </h1>

        <p className="mb-[18px] text-[10px] text-white/60">
          Register your new account
        </p>
        {error && (
          <p className="mb-[10px] w-[224px] text-center text-[9px] text-red-200">
            {error}
          </p>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-[224px] max-[700px]:w-[220px]"
        >
          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
            className="
              mb-[10px] h-[35px] w-full
              rounded-[3px]
              border border-white/70
              bg-transparent
              px-3
              text-[10px] text-white
              outline-none
              placeholder:text-white/55
              placeholder:uppercase
              focus:border-white
            "
          />

          {/* First Name */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            autoComplete="given-name"
            className="
              mb-[10px] h-[35px] w-full
              rounded-[3px]
              border border-white/70
              bg-transparent
              px-3
              text-[10px] text-white
              outline-none
              placeholder:text-white/55
              placeholder:uppercase
              focus:border-white
            "
          />

          {/* Last Name */}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            autoComplete="family-name"
            className="
              mb-[10px] h-[35px] w-full
              rounded-[3px]
              border border-white/70
              bg-transparent
              px-3
              text-[10px] text-white
              outline-none
              placeholder:text-white/55
              placeholder:uppercase
              focus:border-white
            "
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="
              mb-[10px] h-[35px] w-full
              rounded-[3px]
              border border-white/70
              bg-transparent
              px-3
              text-[10px] text-white
              outline-none
              placeholder:text-white/55
              placeholder:uppercase
              focus:border-white
            "
          />

          {/* Password */}
          <div
            className="
              mb-[10px]
              flex h-[35px] w-full
              items-center
              rounded-[3px]
              border border-white/70
              bg-transparent
              focus-within:border-white
            "
          >
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              autoComplete="new-password"
              className="
                h-full flex-1
                bg-transparent
                px-3
                text-[10px] text-white
                outline-none
                placeholder:text-white/55
                placeholder:uppercase
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="
                mr-2 text-[8px] font-bold
                text-white/70
                hover:text-white
              "
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          {/* Confirm Password */}
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
            autoComplete="new-password"
            className="
              mb-[10px] h-[35px] w-full
              rounded-[3px]
              border border-white/70
              bg-transparent
              px-3
              text-[10px] text-white
              outline-none
              placeholder:text-white/55
              placeholder:uppercase
              focus:border-white
            "
          />

          {/* Register */}
          <button
            type="submit"
            disabled={loading}
            className="
    mt-[10px]
    h-[34px] w-[224px]
    rounded-[3px]
    bg-white
    text-[11px] font-bold
    text-[#3154ae]
    shadow-[0_3px_6px_rgba(0,0,0,0.18)]
    transition duration-200
    hover:-translate-y-[1px]
    hover:bg-gray-100
    active:translate-y-0
    disabled:cursor-not-allowed
    disabled:opacity-60
    max-[700px]:w-[220px]
  "
          >
            {loading ? "REGISTERING..." : "REGISTER"}
          </button>

          {/* Back to Login */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="
              mt-[12px]
              block w-full
              bg-transparent
              text-center
              text-[11px]
              text-white/90
              hover:text-white
              hover:underline
            "
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

// Payload ab exactly ye jayega

// Agar user form mein:

// Username: moowoa.n
// First Name: Bkwoowa
// Last Name: noaptj
// Email: biipipzdrdnjan1@gmail.com
// Password: Biypyqrjan@123

// bharega, toh payload hoga:

// {
//   username: "moowoa.n",
//   firstName: "Bkwoowa",
//   lastName: "noaptj",
//   email: "biipipzdrdnjan1@gmail.com",
//   password: "Biypyqrjan@123"
// }

// confirmPassword API ko nahi jayega. Woh only frontend validation ke liye hai.

// Agar tu mujhe register API ka URL + method (POST) + headers/auth requirement de de, next step mein isi handleSubmit ke andar actual fetch/axios API integration laga sakte hain.
