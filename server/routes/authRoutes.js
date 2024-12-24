const express=require('express');
const dotenv=require('dotenv').config();
const cors=require('cors');
const app=express();
const port=8000;
const {test,registerUser,loginUser,getProfile,logout} =require('../controllers/authContoller')
const router=express.Router();
const authMiddleware = require('../middleware/authMiddleware');
/*router.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)*/

router.get('/',test)

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile', authMiddleware,getProfile)
router.post('/logout', logout);

module.exports=router
