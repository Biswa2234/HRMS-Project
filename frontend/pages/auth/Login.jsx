import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      username,
      password,
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#7191e7]">

      {/* ================= BACKGROUND SHAPES ================= */}

      <div className="absolute -left-[180px] top-[205px] h-[230px] w-[850px] rotate-[8deg] rounded-[100px] bg-[#5778dc]/65" />

      <div className="absolute -right-[350px] top-[250px] h-[170px] w-[1200px] -rotate-[7deg] rounded-[100px] bg-[#7593e6]/65" />

      <div className="absolute bottom-[-580px] left-[250px] h-[720px] w-[720px] rounded-full bg-[#5678da]/75" />

      <div className="absolute -right-[220px] -top-[350px] h-[720px] w-[300px] -rotate-[7deg] rounded-[100px] bg-[#6d8de5]/70" />

      <div className="absolute right-[20px] -top-[250px] h-[650px] w-[280px] -rotate-[7deg] rounded-[100px] bg-[#5b7edd]/50" />

      <div className="absolute -bottom-[30px] -left-[250px] h-[230px] w-[650px] rotate-[10deg] rounded-[100px] bg-[#6385e2]/70" />


      {/* ================= LOGIN CARD ================= */}

      <div
        className="
          relative z-10
          flex h-[475px] w-[950px]
          flex-col items-center
          rounded-[16px]
          bg-[#1e48be]/90
          pt-[82px]
          shadow-[0_10px_30px_rgba(20,50,130,0.35)]
          max-[700px]:h-[430px]
          max-[700px]:w-[92%]
          max-[700px]:pt-[65px]
        "
      >

        {/* ================= ICON ================= */}

        <div className="mb-[38px] flex h-[82px] w-[82px] items-center justify-center max-[700px]:mb-[30px]">

          <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[76px] w-[76px]"
          >

            {/* Cart */}
            <path
              d="M18 25H27L34 53H59L66 29H31"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Wheels */}
            <circle
              cx="38"
              cy="62"
              r="4"
              stroke="white"
              strokeWidth="2.5"
            />

            <circle
              cx="57"
              cy="62"
              r="4"
              stroke="white"
              strokeWidth="2.5"
            />

            {/* Upload arrow */}
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


        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="w-[224px] max-[700px]:w-[220px]"
        >

          {/* USERNAME */}

          <div
            className="
              mb-[13px]
              flex h-[35px] w-full
              items-center
              rounded-[3px]
              border border-white/70
              bg-transparent
              focus-within:border-white
            "
          >

            {/* User icon */}
            <div className="flex w-[36px] items-center justify-center text-white/65">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-[15px] w-[15px]"
              >
                <circle cx="12" cy="8" r="3.5" />

                <path d="M5 20C5.8 15.8 8.2 14 12 14C15.8 14 18.2 15.8 19 20" />
              </svg>

            </div>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
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


          {/* PASSWORD */}

          <div
            className="
              mb-[13px]
              flex h-[35px] w-full
              items-center
              rounded-[3px]
              border border-white/70
              bg-transparent
              focus-within:border-white
            "
          >

            {/* Lock icon */}
            <div className="flex w-[36px] items-center justify-center text-white/65">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-[15px] w-[15px]"
              >

                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="1.5"
                />

                <path d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10" />

              </svg>

            </div>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
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


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="
              mt-[18px]
              h-[34px]
              w-[224px]
              rounded-[3px]
              border-none
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
            LOGIN
          </button>


          {/* FORGOT PASSWORD */}

          <button
            type="button"
            className="
              mt-[10px]
              block
              w-full
              border-none
              bg-transparent
              text-center
              text-[12px]
              text-white/90
              hover:text-white
              hover:underline
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
