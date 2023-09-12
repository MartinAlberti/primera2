import 'dotenv/config'

import mongoose from "mongoose";
export default async function mongoConnection() {
  console.log(process.env.MONGO_URL)
 
}
