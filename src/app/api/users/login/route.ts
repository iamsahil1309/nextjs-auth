import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody
        console.log(reqBody)

        const user = await User.findOne({email})
        
        // for user //
        if(!user) {
            return NextResponse.json({error: 'User not exist'}, {status: 400})
        }
        console.log('user exist')

        // for password //
        // compare the password //
     const validPassword = await bcryptjs.compare(password, user.password)

     if(!validPassword){
        return NextResponse.json({error: 'Check your credentials'}, {status: 400})
     }

     // payload //
     const tokenData = {
        id : user._id,
        email: user.email,
        password: user.password,
     }

      //create token: for token we need data//
      //token is a long encripted string where we put our payload(data)//
      
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

     const response = NextResponse.json({
        message: "Logged in success",
        success: true,
     })

     // now we store nextresponse in response, we can send cookies //
     response.cookies.set('token', token, {
        httpOnly: true,
     })

     return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}