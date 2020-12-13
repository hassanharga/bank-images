export type Config = {
  env: string;
  jwt: {
    jwtSecret: string;
    masterKey: string;
  };
  mongo: {
    url: string;
  };
  user: {
    blockDuration: number;
    validLoginAttempts: number;
  };
};
