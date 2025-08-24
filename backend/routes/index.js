import express from 'express';
const router = express.Router();

import auth from './auth.js'
import employee from './employee.js'
import crop from './crop.js'
import livestock from './livestock.js'
import field from './field.js'
import pen from './pen.js'
import equipment from './equipment.js'
import inventory from './inventory.js'
import sales from './sales.js'
import salesdetails from './salesdetails.js'
import supplier from './supplier.js'
import resupply from './resupply.js'
import planner from './planner.js'
import superAdmin from './superAdmin.js'

router.use('/auth', auth);
router.use('/employees', employee);
router.use('/crops', crop);
router.use('/livestock', livestock);
router.use('/fields', field);
router.use('/pens', pen);
router.use('/equipment', equipment);
router.use('/inventory', inventory);
router.use('/sales', sales);
router.use('/salesdetails', salesdetails);
router.use('/suppliers', supplier);
router.use('/resupplies', resupply);
router.use('/planner', planner);
router.use('/super-admin', superAdmin);

export default router;
