import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { User } from "../model/User";
import Authenticator, { authenticatorData } from "../services/Authenticator";
import GenerateId from "../services/GenerateId";
import { HashManager } from "../services/HashManager";

export async function signup(req: Request, res: Response) {
    try {
        const { name, email, password, role } = req.body

        if (!name || !email || !password || !role) {
            return res.status(422).send("Insira corretamente as informações de 'name', 'email', 'password' e 'role'")
        }

        if (password.length < 6) {
            return res.status(400).send("A senha deve ter no mínimo 6 caracteres")
        }

        const userDatabase = new UserDatabase()
        const user = await userDatabase.getUserByEmail(email)

        if (user) {
            return res.status(409).send('Esse email já está cadastrado!')
        }

        const idGenerate = new GenerateId()
        const id = idGenerate.createId()

        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(password)

        const newUser = new User(id, name, email, hashPassword, role)

        await userDatabase.createUser(newUser)

        const payload: authenticatorData = {
            id: id,
            role: role
        }

        const authenticator = new Authenticator()
        const token = authenticator.generateToken(payload)

        res.status(200).send({ message: 'Usuário criado com sucesso', token })
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}