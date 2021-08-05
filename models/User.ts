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
        this.followers = [];
        this.following = [];
        this.bio = null;
        this.skills = [];
        this.createdAt = null;
        this.image = "";
        this.isVerified = false;
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
        followers: EntitySchemaColumnOptions;
        following: EntitySchemaColumnOptions;
        bio?: EntitySchemaColumnOptions;
        skills?: EntitySchemaColumnOptions;
        createdAt?: EntitySchemaColumnOptions;
        isVerified: EntitySchemaColumnOptions;
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
            default: [],
        },
        followers: {
            type: "array",
            array: true,
            default: [],
        },
        following: {
            type: "array",
            array: true,
            default: [],
        },
        bio: {
            type: "varchar",
            nullable: true,
        },
        skills: {
            type: "array",
            array: true,
        },
        createdAt: {
            type: "date",
        },
        image: {
            type: "varchar",
        },
        isVerified: {
            type: "boolean",
            default: false,
        },
    },
};

export const mongooseUserSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    image: String,
    emailVerified: Date,
    projectLikes: {
        type: [Object],
    },
    followers: [],
    following: [],
    bio: String,
    skills: [],
    createdAt: Date,
    isVerified: Boolean,
});

export const mongooseUserModel =
    mongoose.models.users || mongoose.model("users", mongooseUserSchema);
