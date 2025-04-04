import { User, UserLoginBody, UserRegisterBody } from "../models";
import { requestService, tokenService } from "../services";
import { create } from "zustand";

const requests = requestService();
const useTokenService = tokenService();

interface UserStore {
  user: User | null
  setUser: (value: User | null) => void
  populate: () => Promise<void>
  login: (loginBody: UserLoginBody) => Promise<void>
  register: (registerBody: UserRegisterBody) => Promise<void>
  logout: () => Promise<void>
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null,

  setUser: (value: User | null) => {
    set(() => ({ user: value }));
  },

  populate: async () => {
    try {
      const response = await requests.getCurrentUser();
      get().setUser(response.user as User);
    } catch {
      if (await useTokenService.get()) {
        useTokenService.destroy();
      }

      get().setUser(null)
    }
  },

  login: async (loginBody: UserLoginBody) => {
    const response = await requests.login(loginBody);
    const token = response.token;

    useTokenService.set(token);
    await get().populate();
  },

  register: async (registerBody: UserRegisterBody) => {
    const response = await requests.register(registerBody)
    const token = response.token

    useTokenService.set(token)
    await get().populate()
  },

  logout: async () => {
    await requests.logout()
    await get().populate()
  },
}))

export { useUserStore }