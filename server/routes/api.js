import express from 'express'
import * as UserController from '../controllers/UserController.js'
import * as TaskController from '../controllers/TaskController.js'
import AuthController from '../middlewares/AuthMiddleware.js'

const router=express.Router();

router.post('/register',UserController.Register)
router.post('/login',UserController.Login)
router.get('/logout',UserController.Logout)
router.post('/send-otp',UserController.SendOtp)
router.post('/verify-otp',UserController.VerifyOTP)
router.post('/change-password',UserController.ChangePassword)
router.get('/get-user-info',AuthController,UserController.GetUserinfo)
router.post('/update-profile',AuthController,UserController.UpdateProfile)


router.post('/create-Task',AuthController,TaskController.CreateTask)
router.post('/update-task/:id',AuthController,TaskController.UpdateTask)
router.get('/delete-task/:id',AuthController,TaskController.DeleteTask)
router.get('/read-task/:id',AuthController,TaskController.ReadTask)
router.get('/read-all-task',AuthController,TaskController.ReadAllTask)


export default router;