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
    },
};
