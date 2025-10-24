export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
    message: string,
    data: {
        token: string
    }
}
