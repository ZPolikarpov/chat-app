import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"
import {create} from "zustand"

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async (params) => {
    try {
      const res = await axiosInstance.get("/auth/check")

      set({authUser: res.data})
    } catch (error) {
      console.log("Error in checkAuth:",error)
      set({authUser: null})
    } finally {
      set({isCheckingAuth: false})
    }
  },

  signup: async (data) => {
    set({isSigningUp: true})
    try {
      const res = await axiosInstance.post("/auth/signup", data)
      toast.success("Account created successfully")
      set({authUser: res.data})
    } catch (error) {
      toast.error(error.response.data.message)
      console.error("Error in signup:",error)
    } finally {
      set({isSigningUp: false})
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },

  login: async (data) => {
    set({isLoggingIn: true})
    try {
      const res = await axiosInstance.post("/auth/login", data)
      toast.success("Logged in successfully")
      set({authUser: res.data})
    } catch (error) {
      toast.error(error.response.data.message)
      console.error("Error in login:",error)
    } finally {
      set({isLoggingIn: false})
    }
  },

  updateProfile: async (data) => {
    set({isUpdatingProfile: true})

    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({authUser: res.data});
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error in updateProfile:",error);
      toast.error(error.response.data.message);
    } finally {
      set({isUpdatingProfile: false});
    }
  }
}))