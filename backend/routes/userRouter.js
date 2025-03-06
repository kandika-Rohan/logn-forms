import express from "express";

const Router=express.Router();

import {userLoginController,userSignUpController,allUsersController} from '../controllers/userControllers.js'

Router.post('/login',userLoginController);

Router.post('/signup',userSignUpController);

Router.get("/allusers",allUsersController);

export default Router;