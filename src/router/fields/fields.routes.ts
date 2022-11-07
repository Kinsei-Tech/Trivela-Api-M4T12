import { Router } from "express";
import createFieldController from "../../controllers/fields/createField.controller";
import deleteFieldController from "../../controllers/fields/deleteField.controller";
import listFieldsController from "../../controllers/fields/listFields.controller";
import softDeleteFieldController from "../../controllers/fields/softDeleteField.controller";
import updateFieldController from "../../controllers/fields/updateField.controller";

const router = Router()

router.post("", createFieldController)
router.get("/owners/:id", listFieldsController)
router.patch("/owners/:id", updateFieldController)
router.delete("/:id", deleteFieldController)
router.delete("/:id", softDeleteFieldController)


export default router