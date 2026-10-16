import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email,
    };

    console.log("Forgot Password Payload:", payload);

    // API call yahan add karenge
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

      {/* Card */}
      <div
        className="
          relative z-10
          flex h-[430px] w-[950px]
          flex-col items-center
          rounded-[16px]
          bg-[#1e48be]/90
          pt-[65px]
          shadow-[0_10px_30px_rgba(20,50,130,0.35)]
          max-[700px]:h-[400px]
          max-[700px]:w-[92%]
          max-[700px]:pt-[55px]
        "
      >

        {/* Lock Icon */}
        <div className="mb-[25px] flex h-[65px] w-[65px] items-center justify-center">
          <svg
            viewBox="0 0 80 80"
            fill="none"
            className="h-[58px] w-[58px]"
          >
            <rect
              x="20"
              y="32"
              width="40"
              height="30"
              rx="4"
              stroke="white"
              strokeWidth="3"
            />

            <path
              d="M28 32V24C28 17.4 33.4 12 40 12C46.6 12 52 17.4 52 24V32"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <circle
              cx="40"
              cy="46"
              r="4"
              fill="white"
            />

            <path
              d="M40 50V55"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="mb-[5px] text-[19px] font-bold uppercase text-white">
          Forgot Password
        </h1>

        <p className="mb-[22px] text-center text-[10px] text-white/60">
          Enter your email to reset your password
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-[224px] max-[700px]:w-[220px]"
        >

          {/* Email */}
          <div
            className="
              flex h-[35px] w-full
              items-center
              rounded-[3px]
              border border-white/70
              bg-transparent
              focus-within:border-white
            "
          >
            <div className="flex w-[36px] items-center justify-center text-white/65">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-[15px] w-[15px]"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />

                <path d="M3 7L12 13L21 7" />
              </svg>
            </div>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="
                h-full
                flex-1
                bg-transparent
                pr-2
                text-[10px]
                text-white
                outline-none
                placeholder:text-white/55
                placeholder:uppercase
              "
            />
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            className="
              mt-[18px]
              h-[34px]
              w-[224px]
              rounded-[3px]
              bg-white
              text-[11px]
              font-bold
              text-[#3154ae]
              shadow-[0_3px_6px_rgba(0,0,0,0.18)]
              transition
              duration-200
              hover:-translate-y-[1px]
              hover:bg-gray-100
              active:translate-y-0
              max-[700px]:w-[220px]
            "
          >
            RESET PASSWORD
          </button>

          {/* Back to Login */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="
              mt-[15px]
              block
              w-full
              bg-transparent
              text-center
              text-[11px]
              text-white/90
              hover:text-white
              hover:underline
            "
          >
            Back to Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

// App.jsx mein route add kar
// import ForgotPassword from "./pages/auth/ForgotPassword";


// Aur <Routes> ke andar:

// <Route
//   path="/forgot-password"
//   element={<ForgotPassword />}
// />

// Login.jsx mein Forgot Password button

// Tere existing button ko:

// <button
//   type="button"
//   onClick={() => navigate("/forgot-password")}
//   className="
//     mt-[10px]
//     block
//     w-full
//     border-none
//     bg-transparent
//     text-center
//     text-[12px]
//     text-white/90
//     hover:text-white
//     hover:underline
//   "
// >
//   Forgot password?
// </button>


// Ab flow:

// LOGIN
//   │
//   ├── New User? Register
//   │        ↓
//   │     REGISTER
//   │
//   └── Forgot password?
//            ↓
//       FORGOT PASSWORD
//            │
//            └── Back to Login


// Payload abhi:

// {
//   email: "user@example.com"
// }


// Agar tumhare forgot-password API ka exact payload bhi de do, main isi component mein actual API call bhi laga dunga.