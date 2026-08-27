import { useState } from "react";
import { loginAdmin } from "../auth.service";

function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(email, password) {
    try {
      setIsLoading(true);
      setError("");

      const result = await loginAdmin({
        email,
        password,
      });

      if (!result.success || !result.data?.token) {
        throw new Error(
          result.message || "Login failed.",
        );
      }

      localStorage.setItem(
        "adminToken",
        result.data.token,
      );

      return {
        success: true,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to login.";

      setError(message);

      return {
        success: false,
        message,
      };
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("adminToken");
  }

  function isAuthenticated() {
    return Boolean(
      localStorage.getItem("adminToken"),
    );
  }

  return {
    login,
    logout,
    isAuthenticated,
    isLoading,
    error,
  };
}

export default useAuth;