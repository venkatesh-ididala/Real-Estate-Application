import express from 'express';
import createListing from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyuser.js';
const router=express.Router();

router.post('/create/:id' ,verifyToken,createListing);

export default router;