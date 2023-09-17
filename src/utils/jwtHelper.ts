import { getLocalstorageData } from "./localStorageHelper";
import { JWT_TOKEN } from "../components/constant";
import jwtDecode from "jwt-decode";

type UserToken = string | null;

function isLoggedIn(): boolean {
    // Get the token from localStorage
    const token: UserToken = getLocalstorageData(JWT_TOKEN);

    if (token) {
        try {
            // Decode the token to get its payload
            const decodedToken: any = jwtDecode(token);

            // Check if the token is expired (exp is the expiry time in seconds)
            if (decodedToken && decodedToken.exp && decodedToken.exp > Date.now() / 1000) {
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    // Token is not present or expired
    return false;
}

export { isLoggedIn }