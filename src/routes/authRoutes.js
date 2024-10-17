import Auth from "express-authrouter";
import { prisma } from "../config/database.js";

const auth = new Auth(prisma,'hola mundo!', ['username'])
export { auth }
