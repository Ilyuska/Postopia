import mongoose from "mongoose";
import { NotFoundError } from "../models/Error";

export const isValidId = (id:string, context: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new NotFoundError(`${context} не найден`);
    }
    return
}