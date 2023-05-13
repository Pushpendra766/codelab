import React, { useState } from "react";
import Modal from "./Modal";
import { GrClose } from "react-icons/gr";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";

const LoginModal = ({
  isModalOpen,
  setIsModalOpen,
  isSignup,
  setIsSignup,
  setIsLoggedIn,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsModalOpen(false);
        toast.success("Logged in Successfully!");
        setIsLoggedIn(true);
        setIsLoggingIn(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/network-request-failed") {
          toast.error("Network error!");
        } else {
          toast.error("Invalid email or password!");
        }
        setIsLoggingIn(false);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Confirm password doesn't match!", {
        duration: 2000,
      });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setIsModalOpen(false);
          toast.success("Account Created Successfully!");
          setIsLoggedIn(true);
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            toast.error("Email already exists!");
          } else {
            toast.error("Something went wrong!");
          }
        });
    }
  };
  return (
    <div className="container mx-auto">
      <Toaster />
      <Modal isModalOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="bg-white p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mb-4">
              {isSignup ? "Sign Up" : "Login"}
            </h2>
            <button onClick={handleCloseModal}>
              <GrClose />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {isSignup ? (
              <form className="flex flex-col gap-4" onSubmit={handleSignup}>
                <input
                  type="email"
                  placeholder="Email"
                  className="py-2 pl-2 border-2 rounded-md"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="py-2 pl-2 border-2 rounded-md"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="py-2 pl-2 border-2 rounded-md"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  className="text-[#ffffff] bg-[#2C74B3] px-4 py-2 rounded-full font-semibold hover:bg-[#205295]"
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  className="py-2 pl-2 border-2 rounded-md"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="py-2 pl-2 border-2 rounded-md"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="text-[#ffffff] bg-[#2C74B3] px-4 py-2 rounded-full font-semibold hover:bg-[#205295]"
                  type="submit"
                >
                  {isLoggingIn ? "Logging in..." : "Login"}
                </button>
              </form>
            )}

            <hr />
            <button
              className="text-[#ffffff] bg-[#16a34a] px-4 py-2 rounded-full font-semibold hover:bg-[#55ad33] sm:w-1/2 mx-auto whitespace-nowrap"
              onClick={() => {
                setIsSignup(!isSignup);
              }}
            >
              {isSignup ? "Already have an account" : "Create new account"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
