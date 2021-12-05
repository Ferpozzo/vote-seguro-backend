import { userRouter } from "./user";
import { authRouter } from '../middleware/auth'
import { votationRouter } from "./votations";

const routes = [userRouter, authRouter, votationRouter]

export { routes }