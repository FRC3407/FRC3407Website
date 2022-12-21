import mongoose from "mongoose";

class Connection {
  public static async createConnect() {
    if (!process.env.MONGI_URI) return {}
    try {
      let connection = await mongoose.connect("");

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
