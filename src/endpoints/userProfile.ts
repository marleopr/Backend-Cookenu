import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { InvalidError } from "../error/invalidError";
import Authenticator from "../services/Authenticator";

export async function userProfile(req: Request, res: Response) {
    try {
        const token = req.headers.authorization as string

        if (!token) {
            throw new InvalidError("Token não encontrado");
        }

        const userData = new UserDatabase()

        const authenticator = new Authenticator()
        const payload = authenticator.verifyToken(token)

        const user = await userData.getUserById(payload.id)

        res.status(200).send({
            id: user?.id,
            name: user?.name,
            email: user?.email
        })

    } catch (error: any) {
        res.status(error.statusCode || 500).send({ message: error.message || "Erro desconhecido" })
    }
}