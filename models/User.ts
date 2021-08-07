import mongoose from "mongoose";
import Adapters from "next-auth/adapters";

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
        // this.createdAt = null;
        // this.image = "";
        this.isVerified = false;
    }
}

export const UserSchema = {
    name: "User",
    target: User,
    columns: {
        ...Adapters.TypeORM.Models.User.schema.columns,
        username: {
            type: "varchar",
            default: null,
            unique: true,
        },
        projectLikes: {
            type: "array",
            default: [],
            array: true,
        },
        followers: {
            type: "array",
            default: [],
            array: true,
        },
        following: {
            type: "array",
            default: [],
            array: true,
        },
        bio: {
            type: "varchar",
            default: null,
        },
        skills: {
            type: "array",
            default: [],
            array: true,
        },
        isVerified: {
            type: "boolean",
            default: false,
        },
    },
};

export const mongooseUserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: null,
        },
        email: {
            type: String,
            default: null,
            unique: true,
        },
        image: {
            type: String,
            default: null,
        },
        emailVerified: {
            type: Date,
            default: null,
        },
        username: {
            type: String,
            default: null,
            unique: true,
        },
        projectLikes: {
            type: [Object],
        },
        followers: {
            type: [Object],
            default: [],
        },
        following: {
            type: [Object],
            default: [],
        },
        bio: {
            type: String,
            default: null,
        },
        skills: {
            type: [String],
            default: [],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const mongooseUserModel =
    mongoose.models.users || mongoose.model("users", mongooseUserSchema);
