import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { InsufficientAuthorization } from "../error/InsuficienceAuthorization";
import { MissingFields } from "../error/MissingFields";
import Authenticator from "../services/Authenticator";

export async function deleteUser(req: Request, res: Response) {
    try {
        const token = req.headers.authorization as string
        const id = req.params.id

        if (!id || !token) {
            throw new MissingFields()
        }

        const authenticator = new Authenticator()
        const authenticatorData = authenticator.verifyToken(token)
        const userDatabase = new UserDatabase()

        if (authenticatorData.role !== "ADMIN") {
            throw new InsufficientAuthorization()
        }

        await userDatabase.deleteUser(id)
        res.status(200).send("Usuário deletado")

    } catch (error: any) {
        res.status(error.statusCode || 500).send({ message: error.message })
    }
}