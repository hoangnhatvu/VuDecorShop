interface User {
    id: string;
    updateToken: string;
    name: string;
    username: string;
    role: string;
  }
  
  interface Token {
    accessToken: string
    refreshToken: string
  }
  
  interface UserState {
    user: User | null;
    token: Token | null;
    isLoggedIn: boolean;
  }
  
  export type { User, Token, UserState};
  