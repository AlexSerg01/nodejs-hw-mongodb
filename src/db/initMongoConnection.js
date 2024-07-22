import mongoose from "mongoose";

import { env } from "../utils/env.js";

export const initMongoConnection = async () => {
  try {
    const user = env("MONGODB_USER");
    const password = env("MONGODB_PASSWORD");
    const url = env("MONGODB_URL");
    const dataBase = env("MONGODB_DB");

    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${dataBase}?retryWrites=true&w=majority&appName=Cluster0`
    );

    console.log(`Conection is OK`);
  } catch (error) {
    console.log(`Error conection: `, error);
    throw error;
  }
};
