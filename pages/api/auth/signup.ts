import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import validator from "validator";
import * as Jose from "jose";
import { setCookie } from "cookies-next";
const prisma = new PrismaClient();

export default async function signupHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstName, lastName, email, password } = req.body;
    const validationSchema = [
      {
        valid: validator.isLength(firstName, { min: 1, max: 20 }),
        errorMessage: "firstName is invalid",
      },
      {
        valid: validator.isLength(lastName, { min: 1, max: 20 }),
        errorMessage: "lastName is invalid",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "email is invalid",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "password is not strong enough",
      },
    ];

    const errors: string[] = [];

    validationSchema.map((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({ error: errors[0] });
    }
    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (isEmailExist) {
      return res.status(400).json({ error: "email has already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hashedPassword,
      },
    });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new Jose.SignJWT({ email: email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24H")
      .sign(secret);

    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });
    return res.status(200).json({
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      email: newUser.email,
    });
  }
}
