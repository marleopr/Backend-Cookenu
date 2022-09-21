import { Request, Response } from "express";
import { RecipesDataBase } from "../data/RecipesDataBase";
import { InvalidCredencial } from "../error/IncorrectPassword";
import { InvalidError } from "../error/invalidError";
import { MissingFields } from "../error/MissingFields";
import Authenticator from "../services/Authenticator";

export async function getRecipesById(req: Request, res: Response) {
    try {
        const token = req.headers.authorization as string
        const id = req.params.id as string

        if (!id) {
            throw new InvalidError("Não foi passado um ID")
        }

        if (!token) {
            throw new MissingFields()
        }

        const authenticator = new Authenticator()

        const AuthenticationData = authenticator.verifyToken(token)

        if (!AuthenticationData) {
            throw new InvalidCredencial()
        }

        const recipesData = new RecipesDataBase()

        const recipe = await recipesData.getRecipesById(id)

        if (!recipe) {
            throw new InvalidError("Receita não encontrada")
        }

        res.status(201).send({
            id: recipe.id,
            title: recipe.title,
            description: recipe.description
        })

    } catch (error: any) {
        res.status(error.statusCode || 500).send({ message: error.message })
    }
}