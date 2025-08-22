import express from 'express';
const router = express.Router();

import auth from './auth'
import employee from './employee'
import crop from './crop'
import livestock from './livestock'
import field from './field'
import pen from './pen'
import equipment from './equipment'
import inventory from './inventory'
import sales from './sales'
import salesdetails from './salesdetails'
import supplier from './supplier'
import resupply from './resupply'

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

export default router;
