import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  IAuthApiUser,
  IAuthInitialStateType,
  ILoginApiResponse,
  IProfileApiResponse,
  IRegisterApiResponse,
  IUser,
} from "./authTypes"
import { IStatus } from "../../global/types/type"
import { IRegister } from "@/src/app/(auth)/register/registerTypes"
import { ILogin } from "@/src/app/(auth)/login/loginTypes"
import { API, APIWithToken } from "../../global/API/apiCall"
import { AppDispatch } from "../../store"
import { isTokenExpired } from "@/src/features/auth/utils/auth-session"

const AUTH_STORAGE_KEY = "auth_user"

const emptyUser: IUser = {
  id: "",
  username: "",
  email: "",
  role: "student",
  activeRole: "user",
  token: "",
}

const initialState: IAuthInitialStateType = {
  user: emptyUser,
  status: IStatus.IDLE,
}

const persistAuthUser = (user: IUser) => {
  if (typeof window === "undefined") {
    return
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
  localStorage.setItem("user_name", user.username)
  localStorage.setItem("user_email", user.email)
  localStorage.setItem("user_role", user.activeRole)
  localStorage.setItem("user_dmanage_role", user.role)
  localStorage.setItem("user_token", user.token)
}

const clearPersistedAuthUser = () => {
  if (typeof window === "undefined") {
    return
  }

  localStorage.removeItem(AUTH_STORAGE_KEY)
  localStorage.removeItem("user_name")
  localStorage.removeItem("user_email")
  localStorage.removeItem("user_role")
  localStorage.removeItem("user_active_role")
  localStorage.removeItem("user_dmanage_role")
  localStorage.removeItem("user_token")
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    patchUser: (state, action: PayloadAction<Partial<IUser>>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      }
    },
    setStatus: (state, action: PayloadAction<IStatus>) => {
      state.status = action.payload
    },
    clearUser: (state) => {
      state.user = emptyUser
      state.status = IStatus.IDLE
    },
  },
})

const toStoreUser = (user: IAuthApiUser, token = ""): IUser => ({
  ...user,
  token,
})

export const { setUser, patchUser, setStatus, clearUser } = authSlice.actions
export default authSlice.reducer
export {
  AUTH_STORAGE_KEY,
  emptyUser,
  clearPersistedAuthUser,
  persistAuthUser,
}

export class APIAuth {
  static register(userData: IRegister) {
    return async function registerUserThunk(dispatch: AppDispatch) {
      dispatch(setStatus(IStatus.LOADING))

      try {
        const payload = {
          username: userData.username,
          email: userData.email,
          password: userData.password,
          confirmPassword: userData.confirmPassword,
        }

        const response = await API.post<IRegisterApiResponse>(
          "/api/auth/register",
          payload
        )

        const storeUser = toStoreUser(response.data.data.user)

        dispatch(setUser(storeUser))
        dispatch(setStatus(IStatus.SUCCESS))
        persistAuthUser(storeUser)
        return true
      } catch (error) {
        console.error("Registration failed", error)
        dispatch(setStatus(IStatus.ERROR))
        return false
      }
    }
  }

  static login(userData: ILogin) {
    return async function loginUserThunk(dispatch: AppDispatch) {
      dispatch(setStatus(IStatus.LOADING))

      try {
        const response = await API.post<ILoginApiResponse>(
          "/api/auth/login",
          userData
        )

        const storeUser = toStoreUser(
          response.data.data.user,
          response.data.data.token
        )

        dispatch(setUser(storeUser))
        dispatch(setStatus(IStatus.SUCCESS))
        persistAuthUser(storeUser)
        return storeUser
      } catch (error) {
        console.error("Login failed", error)
        dispatch(setStatus(IStatus.ERROR))
        return null
      }
    }
  }

  static validateStoredSession() {
    return async function validateStoredSessionThunk(dispatch: AppDispatch) {
      if (typeof window === "undefined") {
        return null
      }

      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)

      if (!storedUser) {
        dispatch(clearUser())
        return null
      }

      try {
        const parsedUser = JSON.parse(storedUser) as IUser

        if (!parsedUser?.token || isTokenExpired(parsedUser.token)) {
          clearPersistedAuthUser()
          dispatch(clearUser())
          return null
        }

        const response = await APIWithToken.get<IProfileApiResponse>(
          "/api/auth/profile"
        )

        const validatedUser = toStoreUser(
          response.data.data.user,
          parsedUser.token
        )

        dispatch(setUser(validatedUser))
        persistAuthUser(validatedUser)
        return validatedUser
      } catch (error) {
        console.error("Stored session validation failed", error)
        clearPersistedAuthUser()
        dispatch(clearUser())
        return null
      }
    }
  }
}
