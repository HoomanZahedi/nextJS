import { NextApiRequest, NextApiResponse } from "next";
import * as Jose from "jose";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function meHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken: string = req.headers.authorization as string;
  const token = bearerToken.split(" ")[1];
  const payload = jwt.decode(token) as { email: string };

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      email: true,
      id: true,
      first_name: true,
      last_name: true,
    },
  });

  return res.status(200).json({
    success: user,
  });
}
