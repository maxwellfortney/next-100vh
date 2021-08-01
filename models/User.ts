import mongoose from "mongoose";

import Adapters, { TypeORMUserModel } from "next-auth/adapters";
import { EntitySchemaColumnOptions } from "typeorm";

export default class User extends (<any>Adapters.TypeORM.Models.User.model) {
    constructor(
        name: string,
        email: string,
        image: string,
        emailVerified: Date | undefined
    ) {
        super(name, email, image, emailVerified);
        this.username = null;
        this.projectLikes = [];
    }
}

type UserSchema = {
    name: string;
    target: typeof TypeORMUserModel;
    columns: {
        username?: EntitySchemaColumnOptions;
        name?: EntitySchemaColumnOptions;
        email?: EntitySchemaColumnOptions;
        image?: EntitySchemaColumnOptions;
        emailVerified?: EntitySchemaColumnOptions;
        projectLikes: EntitySchemaColumnOptions;
    };
};

export const UserSchema: UserSchema = {
    name: "User",
    target: User,
    columns: {
        ...Adapters.TypeORM.Models.User.schema.columns,
        username: {
            type: "varchar",
            nullable: true,
            unique: true,
        },
        projectLikes: {
            type: "array",
            array: true,
        },
    },
};

// const mongooseUserSchema = new mongoose.Schema({
//     name: String,
//     email: {
//         type: String,
//         unique: true,
//     },
//     image: String,
//     username: {
//         type: String,
//         unique: true,
//     },
//     createdAt: Date,
//     updatedAt: Date,
//     projectLikes: {
//         type: [Object],
//     },
// });

// export const mongooseUserModel = mongoose.model("users", mongooseUserSchema);

export const mongooseUserSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    image: String,
    emailVerified: Date,
    projectLikes: {
        type: [Object],
    },
});

export const mongooseUserModel =
    mongoose.models.users || mongoose.model("users", mongooseUserSchema);
