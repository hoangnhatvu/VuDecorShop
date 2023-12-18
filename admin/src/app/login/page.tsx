import React, { useState, useEffect } from "react";
import Image from "next/image";
import TextInput from "../components/TextInput";
import InputLabel from "../components/InputLabel";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import { Label, Input, Button } from "@roketid/windmill-react-ui";

// import { useRouter } from "next/navigation";
// import { login } from "../redux/features/userSlice";
// import { useAppDispatch, useAppSelector } from "../redux/hooks";

function LoginPage() {
  const imgSource = "/bk.png";

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="relative h-32 md:h-auto md:w-1/2">
            <Image
              aria-hidden="true"
              className="hidden object-cover w-full h-full"
              src={imgSource}
              alt="Office"
              layout="fill"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <InputLabel forInput="email">Email</InputLabel>
              <TextInput
                id="email"
                type="text"
                name="email"
                // value={data.username}
                className="mt-1 block w-full"
                autoComplete="email"
                // handleKeyDown={handleKeyDown}
                // handleChange={onHandleChange}
                required={true}
                placeHolder={"Email"}
              />

              <InputLabel forInput="password">Password</InputLabel>
              <span>Password</span>
              <TextInput
                id="password"
                type="password"
                name="password"
                className="mt-1 block w-full"
                autoComplete="current-password"
                // handleKeyDown={handleKeyDown}
                // handleChange={onHandleChange}
                // value={data.password}
                required={true}
                placeHolder={"Password"}
              />

                <PrimaryButton
                  type="submit"
                  processing={false}
                  className="ml-4"
                  // onClick={handleLogin}
                >
                  ĐĂNG NHẬP
                </PrimaryButton>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
