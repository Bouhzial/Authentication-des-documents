import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { randomBytes } from "crypto";
import { readFile } from "fs/promises";
import nodemailer from "nodemailer";
import { join } from "path";
import { passwordConfigTemplate } from "./template/passwordConfig";


const prisma = new PrismaClient()


let transporter = nodemailer.createTransport({
    host: "mail.tessouira.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "blockauth@tessouira.com", // generated ethereal user
        pass: "bNFph-Wv7F%@", // generated ethereal password
    },
});

//create password configuration token and store it in the database and it expires in 1 hour
export const createPasswordConfigToken = async (id: number) => {
    const token = randomBytes(32).toString("hex");
    // const hashedToken = await hash(token, 10);
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    await prisma.passwordConfiguration.create({
        data: {
            token,
            expires,
            user: {
                connect: {
                    id
                }
            }
        }
    });
    return token;
}


//a function to send email parsed from the email-template.html file
export const sendEmail = async (to: string, subject: string, html: string) => {
    const info = await transporter.sendMail({
        from: '"BlockAuth" <blockauth@tessouira.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
    });
    console.log("Message sent to :", to);
};

//config password email from template function
export const sendPasswordConfigurationEmail = async (id: number, name: string, to: string) => {
    //parse the email template file (public/email-template.html)
    let token = await createPasswordConfigToken(id);
    await sendEmail(to, "Configurer Votre Mot de passe", passwordConfigTemplate(name, token));
};



