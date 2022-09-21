import { Request, Response } from "express";
import { RecipesDataBase } from "../data/RecipesDataBase";
import { BaseError } from "../error/BaseError";
import { InsufficientAuthorization } from "../error/InsuficienceAuthorization";
import { MissingFields } from "../error/MissingFields";
import { USER_ROLES } from "../model/User";
import Authenticator from "../services/Authenticator";

// export async function deleteRecipes(req: Request, res: Response) {
//     try {
//         const token = req.params.authorization as string // pessoa logada
//         const id = req.params.id // id da receita

//         if (!id || !token) {
//             throw new MissingFields()
//         }

//         // verificar se o token é valido
//         const recipesDataBase = new RecipesDataBase()
//         const authenticator = new Authenticator()
//         const authenticatorData = authenticator.verifyToken(token)

//         if (authenticatorData.role !== "ADMIN") {
//             throw new InsufficientAuthorization()
//         }

//         await recipesDataBase.deleteRecipes(id)
//         res.status(200).send("Receita deletada")

//     } catch (error: any) {
//         res.status(error.statusCode || 500).send({ message: error.message })
//     }
// }

export async function deleteRecipes(req: Request, res: Response) {
    try {
        const token = req.headers.authorization // pessoa logada
        const id = req.params.id // id da receita

        if (!token) {
            throw new MissingFields()
        }

        const idPerson = new Authenticator().verifyToken(token)
        const recipeData = new RecipesDataBase()
        const recipeById = await recipeData.getRecipesById(id)

        if (!recipeById) {
            throw new Error("Receita não encontrada");
        }
        const response = await recipeData.deleteRecipes(id)

        res.status(200).send("Receita deletada")

    } catch (error: any) {
        res.status(error.statusCode || 500).send({ message: error.message })
    }
}