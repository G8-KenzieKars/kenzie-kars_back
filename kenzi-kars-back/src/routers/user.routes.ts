import { Router } from "express";

import ensureDataIsValidMiddleware from "../middlewares/global/ensureDataIsValid.middleware";
import { userSchemaRequest, userSchemaUpdate } from "../schemas/user.schema";
import {
  createNewUserController,
  deleteUserController,
  getAllUserVehiclesController,
  getUserController,
  updateUserAdressController,
  updateUserController,
} from "../controllers/user.controllers";
import ensureAuthMiddleware from "../middlewares/user/ensureAuth.middleware";
import ensureEmailUniqueMiddleware from "../middlewares/user/ensureEmailUnique.middleware";
import { addressSchemaRequest } from "../schemas/address.schema";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchemaRequest),
  ensureEmailUniqueMiddleware,
  createNewUserController
);

userRoutes.use(ensureAuthMiddleware);

userRoutes.get("", getUserController);

userRoutes.patch(
  "",
  ensureDataIsValidMiddleware(userSchemaUpdate),
  ensureEmailUniqueMiddleware,
  updateUserController
);

userRoutes.patch(
  "/address",
  ensureDataIsValidMiddleware(addressSchemaRequest),
  updateUserAdressController
);

userRoutes.delete("", deleteUserController);

userRoutes.get("/user_vehicles", getAllUserVehiclesController);

export default userRoutes;
