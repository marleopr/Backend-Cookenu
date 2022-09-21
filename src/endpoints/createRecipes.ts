import { Request, Response } from "express";
import { RecipesDataBase } from "../data/RecipesDataBase";
import { InvalidCredencial } from "../error/IncorrectPassword";
import { MissingFields } from "../error/MissingFields";
import Recipes from "../model/Recipes";
import Authenticator from "../services/Authenticator";
import GenerateId from "../services/GenerateId";

export async function createRecipes(req: Request, res: Response) {
    try {
        const { title, description } = req.body
        const token = req.headers.authorization as string
        if (!title || !description) {
            throw new MissingFields()
        }
        if (!token) {
            throw new InvalidCredencial()
        }

        const authenticator = new Authenticator()
        const payload = authenticator.verifyToken(token)

        if (!payload) {
            throw new InvalidCredencial()
        }

        const data = new Date();
        const day = data.getDate() > 9 ? data.getDate() : '0' + data.getDate();
        const month = (data.getMonth() + 1) > 9 ? data.getMonth() : '0' + (data.getMonth() + 1);
        const year = data.getFullYear();
        const date = `${year}-${month}-${day}`;

        const id = new GenerateId().createId()
        const newRecipes = new Recipes(id, title, description, date, payload.id)
        const recipesData = new RecipesDataBase()
        await recipesData.createRecipes(newRecipes)

        res.status(200).send("Receita criada")

    } catch (error: any) {
        res.status(error.statusCode || 500).send({ message: error.message })
    }

}