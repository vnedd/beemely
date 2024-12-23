import express from 'express';
import { PermissionController } from '../controllers/permission.controller.js';
import { objectIdValidation } from '../validations/objectId.validation.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { CheckPermission } from '../utils/CheckPermission.js';
import {
  createPermissionValidation,
  searchPermissionValidation,
  updatePermissionValidation,
} from '../validations/permission.validation.js';

const permissionRouter = express.Router();

permissionRouter.get(
  '/',
  authMiddleware,
  CheckPermission(['Read_Permission']),
  searchPermissionValidation,
  PermissionController.getAllPermissions
);
permissionRouter.get(
  '/modules',
  authMiddleware,
  CheckPermission(['Read_Permission']),
  PermissionController.getAllModule
);
permissionRouter.get(
  '/:id',
  authMiddleware,
  CheckPermission(['Read_Permission']),
  objectIdValidation,
  PermissionController.getPermission
);
permissionRouter.post(
  '/',
  authMiddleware,
  CheckPermission(['Create_Permission']),
  createPermissionValidation,
  PermissionController.createNewPermission
);
permissionRouter.patch(
  '/:id',
  authMiddleware,
  CheckPermission(['Update_Permission']),
  objectIdValidation,
  updatePermissionValidation,
  PermissionController.updatePermission
);
permissionRouter.delete(
  '/:id',
  authMiddleware,
  CheckPermission(['Delete_Permission']),
  objectIdValidation,
  PermissionController.deletePermission
);

export default permissionRouter;
