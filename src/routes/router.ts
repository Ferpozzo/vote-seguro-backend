import { userRouter } from "./user";
import { votationRouter } from "./votations";
import { candidateRouter } from "./candidate";
import { voteRouter } from "./vote";
import { authRouter } from "./auth";

const routes = [userRouter, authRouter, votationRouter, candidateRouter, voteRouter]

export { routes }