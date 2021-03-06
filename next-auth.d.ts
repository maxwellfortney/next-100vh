import NextAuth from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
    interface Session {
        accessToken?: string;
        provider?: string;
        user: {
            _id: string;
            name?: string;
            email?: string;
            image?: string;
            emailVerified?: Date;
            username?: string;
            likedProjects: Array<any>;
            likedComments: Array<any>;
            followers: Array<any>;
            following: Array<any>;
            bio?: string;
            skills: Array<string>;
            isVerified: boolean;
            lastOnline: Date;
        };
    }
}
