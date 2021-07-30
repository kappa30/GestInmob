import {Router, Response, Request} from 'express';
import {Token} from '../class/token';
import { verificarToken } from '../middlewares/authentication';
import jwt from 'jsonwebtoken';
import connection from '../bin/conectionMySql';
import { json } from 'body-parser';
import query from '../utils/promesas'
import bcrypt from 'bcrypt';
import emailClass from '../class/email';


const admDeptosRoutes = Router();




export default admDeptosRoutes;