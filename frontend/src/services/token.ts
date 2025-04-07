import { storageInstance } from "@/services"
import { TOKEN_STORAGE_NAME } from "@/constants";

export const tokenService = () => {

  async function set(token: string | null) : Promise<void> {
    if (token) {
      await storageInstance.setItem(TOKEN_STORAGE_NAME, token)
    } 
    else {
      await storageInstance.removeItem(TOKEN_STORAGE_NAME)
    }
  }

  async function get(): Promise<string | null> {
    return storageInstance.getItem(TOKEN_STORAGE_NAME);
  }

  async function destroy() : Promise<void> {
    await set(null)
  }

  return {
    set,
    destroy,
    get,
  };
};