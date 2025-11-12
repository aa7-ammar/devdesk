import jwt, {JwtPayload} from "jsonwebtoken";

export const createToken = (id : string) => {
    return jwt.sign({id} , process.env.JWT_SECRET! , {expiresIn : '7d'});
};

export const verifyToken = (token : string) : JwtPayload | null =>{
    try{
        return jwt.verify(token , process.env.JWT_SECRET!) as JwtPayload;
    }
    catch(e){
        return null;
    }
}