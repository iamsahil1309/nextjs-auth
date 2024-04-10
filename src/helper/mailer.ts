import User from "@/models/usermodel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // configure mail for usage //

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set:{
          verifyToken: hashedToken,
        verifyTokenExpiry:new Date(Date.now() + 3600000),
        }
      });
    }

    if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
       $set : {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
       }
      });
    }

    // how to send email
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "884e611c2160e5",
        pass: "c79832cb1b2217",
      },
    });

    const mailOptions = {
      from: "sahil@sahil.ai",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Rest Your Password",
        
      html: `<p>CLick <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to $
    {  emailType === 'VERIFY' ? "verify your email" : "reset your password" }
    or copy and paste the link below in your browser.
    <br>${process.env.DOMAIN}/verifyemail?token = ${hashedToken}
    </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
