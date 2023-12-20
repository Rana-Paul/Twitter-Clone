import { User } from "prisma/prisma-client";
import JWT from 'jsonwebtoken'
import { JWTUser } from "../interfaces";


class JWTServices {
    public static  generateTokenForUser(user: User) {
        const payload: JWTUser = {
            id: user?.id,
            email: user?.email
        }
        const token = JWT.sign(payload, process.env.JWT_SECRET as string);
        return token;
    }

    public static decodeToken(token: string) {

        try {
            
            return JWT.verify(token, process.env.JWT_SECRET as string) as JWTUser
        } catch (error) {
            return null            
        }
    }

}

export default JWTServices