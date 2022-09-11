import mongoose from "mongoose";

export default function (connectionString: string) {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  });
  mongoose.connection.on("disconnected", () => {
    console.error(`Mongodb's connection is disconnected`);
  });
  mongoose.connection.on("error", (error) => {
    console.error(`Mongodb's connection has a error: ${error}`);
  });
}
