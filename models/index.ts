/* eslint-disable import/no-anonymous-default-export */
import User, { UserSchema } from "./User";

export default {
    User: {
        model: User,
        schema: UserSchema,
    },
};
