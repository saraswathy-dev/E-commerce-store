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
      toast.success("Signup successful! 🎉");
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
      const response = await axios.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
      console.log(user);
    } catch (error) {
      set({ checkingAuth: false, user: null });
    }
  },
}));
