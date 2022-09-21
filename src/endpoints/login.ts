import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { InvalidCredencial } from "../error/IncorrectPassword";
import { User } from "../model/User";
import Authenticator, { authenticatorData } from "../services/Authenticator";
import GenerateId from "../services/GenerateId";
import { HashManager } from "../services/HashManager";

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(422).send("Insira corretamente as informações de 'name', 'email', 'password' e 'role'")
        }

        const userDatabase = new UserDatabase()
        const userDB = await userDatabase.getUserByEmail(email)

        if (!userDB) {
            return res.status(409).send('Email não encontrado')
        }

        const hashManager = new HashManager()
        const hashPassword = await hashManager.compare(password, userDB.password)

        if (!InvalidCredencial) {
            return res.status(401).send("Email ou senha incorreta")
        }

        const payload: authenticatorData = {
            id: userDB.id,
            role: userDB.role
        }

        const authenticator = new Authenticator()
        const token = authenticator.generateToken(payload)

        res.status(200).send({ message: 'Usuário logado com sucesso', token })
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}