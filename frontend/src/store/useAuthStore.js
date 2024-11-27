import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"
import {create} from "zustand"
import { io } from "socket.io-client"

const BASE_URL = "http://localhost:5001"

export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check")

      set({authUser: res.data})
      get().connectSocket()
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
      get().connectSocket()
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
      get().disconnectSocket()
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

      get().connectSocket()
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
  },
  connectSocket: () => {
    const {authUser} = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL);
    socket.connect();

    set({ socket: socket });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}))