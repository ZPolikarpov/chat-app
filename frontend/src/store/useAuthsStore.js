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
    try {
      set({isSigningUp: true})
      const res = await axiosInstance.post("/auth/signup", data)
      set({authUser: res.data})
    } catch (error) {
      console.log("Error in signup:",error)
    } finally {
      set({isSigningUp: false})
    }
  }
}))