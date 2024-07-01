import userModel, { UserType } from '@/models/user.model'
import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET_TOKEN as string | undefined

export async function DataFromToken(token : string) : Promise<UserType | null>{

    try {

        if (!token) {
            return null
        }

        const user =  jwt.verify(token, SECRET as string ) as { _id : string, email : string }

        const userFromDB  = await userModel.findById(user._id!)

        if(!userFromDB){
            return null
        }

        return userFromDB
    } catch (error: unknown) {
        console.log((error as Error).message)
        return null
    }
}
