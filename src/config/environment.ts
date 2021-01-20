require("dotenv").config();

const environment = {
  APP_PORT: process.env.APP_PORT,
  HASH_SALT_ROUNDS: 10,
  JWT: {
    // SECRET: process.env.JWT_SECRET,
    DURATION: process.env.JWT_DURATION || "15m",
    PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,
    REFRESH_PRIVATE_KEY: process.env.JWT_REFRESH_PRIVATE_KEY,
    REFRESH_PUBLIC_KEY: process.env.JWT_REFRESH_PUBLIC_KEY,
    REFRESH_DURATION: process.env.JWT_REFRESH_DURATION || "3h",
  },
};

export default environment;
