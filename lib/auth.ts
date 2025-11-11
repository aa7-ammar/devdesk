import jwt from "jsonwebtoken";

export const createToken = (id : string) => {
    return jwt.sign({id} , process.env.JWT_SECRET! , {expiresIn : '7d'});
};

export const verifyToken = (token : string)=>{
    try{
        return jwt.verify(token , process.env.JWT_SECRET!);
    }
    catch(e){
        return null;
    }
}