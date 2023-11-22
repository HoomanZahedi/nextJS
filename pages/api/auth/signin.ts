import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as Jose from "jose";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

export default async function handleSignIn(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "email is invalid",
      },
      {
        valid: validator.isLength(password, { min: 1 }),
        errorMessage: "password is invalid",
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

    const isUserExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!isUserExist) {
      return res.status(401).json({ error: "invalid user!" });
    }

    const isMatch = await bcrypt.compare(password, isUserExist.password);
    if (!isMatch) {
      return res.status(401).json({ error: "incorrect password" });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new Jose.SignJWT({ email: email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24H")
      .sign(secret);

    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

    return res.status(200).json({
      firstName: isUserExist.first_name,
      lastName: isUserExist.last_name,
      email: isUserExist.email,
    });
  }
}
