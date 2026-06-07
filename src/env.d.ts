interface Env {
  readonly AES_SECRET_KEY: string;
}

declare var process: {
  env: Env;
};
