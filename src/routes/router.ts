import { localeRouter } from "./locales";
import { serviceRouter } from "./services";
import { userRouter } from "./user";
import { authRouter } from '../middleware/auth'
import { reservationRouter } from "./reservations";

const routes = [userRouter, localeRouter, serviceRouter, authRouter, reservationRouter]

export { routes }