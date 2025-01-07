import { User } from "./models/user.model";

export interface AuthState {
    currentUser: User | null;
    token: string| null; 
    isLoggedIn: boolean
}

export const initialAuthState: AuthState = {
    currentUser: null,
    token: null,
    isLoggedIn: false

}