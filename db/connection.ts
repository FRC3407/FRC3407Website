import mongoose from "mongoose";

class Connection {
  private constructor() {}
  public static async createConnect() {
    if (typeof process.env.MONGO_URI === "undefined") {
      if (process.env.LOG_CONNECTION_ERRORS === "true") console.error("The server couldn't connect to the Database")
      return "NOCONN"
    };
    try {
      let connection = await mongoose.connect(process.env.MONGO_URI);

      mongoose.connection.on("error", (error) => {
        console.error(error);
      });

      return connection;
    } catch (error: any) {
      console.error(error);

      return error as Error;
    }
  }
}

export default Connection;