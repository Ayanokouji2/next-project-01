import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import userModel from '@/models/user.model'

async function sendMail({ email, subject, userId }: any) {

   

    try {
        const hashedToken = await bcrypt.hash(userId, 10);

        const response = subject === 'verify' ?
            await userModel.findOneAndUpdate({ _id: userId }, {
                verifyToken: hashedToken,
                verifyTokenExpiry: new Date(Date.now() + 3600000)
            }) :
            await userModel.findOneAndUpdate({ _id: userId }, {
                resetPasswordToken: hashedToken,
                resetPasswordTokenExpiry: new Date(Date.now() + 1200000)
            })

        const mailConfig = {
            from: 'shivam@gmail.com',
            to: email,
            subject : subject === 'verify' ? 'Verify your email' : 'Reset your password',
            html: `<h4> This is a mail for You</h4> 
        click <p>Click on the link below to verify your email</p> <a href="${process.env.DOMAIN}/verifyToken?token=${hashedToken}">here</a> to verify your email.`
        }

        console.log("Mail Config : ", mailConfig)

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_USER as string,
                pass: process.env.MAIL_PASS as string
            }
    
        })

        const info = await transporter.sendMail(mailConfig)

        console.log("Message sent: %s", info.messageId)
        return info
    } catch (error: unknown) {
        console.log("Error while sending Mail : ", (error as Error).message)
        return null
    }
}

export default sendMail