import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("password does not match");
    }
    // Password length check
    if (password.length < 6) {
      set({ loading: false });
      return toast.error("Password must be at least 6 characters");
    }
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data.user, loading: false });
      toast.success("Signup successful! 🎉");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occured");
    }
  },
  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data.user, loading: false });
      toast.success("Login successful! 🎉");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occured");
    }
  },
  logout: async () => {
    try {
      const res = await axios.post("/auth/logout");
      set({ user: null });
      toast.success("Logout successful! 🎉");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "An error occured");
    }
  },

checkAuth: async () => {
  set({ checkingAuth: true });

  try {
    const response = await axios.get("/auth/profile", { withCredentials: true });

    set({ user: response.data.user, checkingAuth: false });

  } catch (error) {
    if (error.response?.status === 401) {
      // Access token expired — try to refresh it
      try {
        await axios.post("/auth/refresh-token", {}, { withCredentials: true });

        const res = await axios.get("/auth/profile", { withCredentials: true });

        set({ user: res.data, checkingAuth: false });

      } catch (refreshErr) {
        // Refresh failed — clear user
        set({ user: null, checkingAuth: false });
      }

    } else {
      // Some other error
      set({ user: null, checkingAuth: false });
    }
  }
},


}));
