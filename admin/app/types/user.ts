interface User {
  id: string;
  updated_token: string;
  email: string;
  user_name: string;
  user_image: string;
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
