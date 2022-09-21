import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { USER_ROLES } from "../model/User";

dotenv.config();

export interface authenticatorData{
    id: string, 
    role: USER_ROLES
}

class Authenticator {

    generateToken(payload: authenticatorData) {

        const token = jwt.sign(
            
            payload,

            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.EXPIRES_IN
            }
        );

        return token
    }

    verifyToken(token: string) {

        const payload: authenticatorData = jwt.verify(token, process.env.JWT_KEY as string) as any

        return payload
    }
}

export default Authenticator