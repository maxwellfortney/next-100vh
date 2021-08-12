import NextAuth from "next-auth";
import Adapters from "next-auth/adapters";
import Providers from "next-auth/providers";

import Models from "../../../models";

export default NextAuth({
    // https://next-auth.js.org/configuration/providers
    providers: [
        // Providers.Email({
        //     server: process.env.EMAIL_SERVER,
        //     from: process.env.EMAIL_FROM,
        // }),
        // Temporarily removing the Apple provider from the demo site as the
        // callback URL for it needs updating due to Vercel changing domains
        /*
      Providers.Apple({
        clientId: process.env.APPLE_ID,
        clientSecret: {
          appleId: process.env.APPLE_ID,
          teamId: process.env.APPLE_TEAM_ID,
          privateKey: process.env.APPLE_PRIVATE_KEY,
          keyId: process.env.APPLE_KEY_ID,
        },
      }),
      */
        // Providers.Facebook({
        //     clientId: process.env.FACEBOOK_ID,
        //     clientSecret: process.env.FACEBOOK_SECRET,
        // }),
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
            scope: "read:user repo",
        }),
        Providers.GitLab({
            clientId: process.env.GITLAB_CLIENT_ID,
            clientSecret: process.env.GITLAB_CLIENT_SECRET,
        }),
        {
            id: "bitbucket",
            name: "BitBucket",
            type: "oauth",
            version: "2.0",
            scope: "account repository",
            params: { grant_type: "authorization_code" },
            accessTokenUrl: "https://bitbucket.org/site/oauth2/access_token",
            authorizationUrl:
                "https://bitbucket.org/site/oauth2/authorize/?response_type=code",
            profileUrl: "https://api.bitbucket.org/2.0/user",
            async profile(profile: any, tokens: any) {
                console.log("Profile ", profile);
                console.log("Tokens ", tokens);

                if (profile && tokens) {
                    const res = await fetch(
                        "https://api.bitbucket.org/2.0/user/emails?access_token=" +
                            tokens.access_token
                    );
                    const resJson = await res.json();

                    if (res.status === 200) {
                        return {
                            id: profile.account_id,
                            name: profile.display_name || null,
                            email: resJson.values[0].email,
                            image: profile.links.avatar.href,
                        };
                    }
                }

                return {
                    id: profile.account_id,
                    name: profile.display_name || null,
                    email: null,
                    image: profile.links.avatar.href,
                };
            },
            clientId: process.env.BITBUCKET_ID as string,
            clientSecret: process.env.BITBUCKET_SECRET as string,
        },
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    secret: process.env.SECRET,
    session: {
        jwt: true,

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },
    pages: {
        signIn: "/signin", // Displays signin buttons
        newUser: "/signup/new", // If set, new users will be directed here on first sign in

        // signOut: "/", // Displays form with sign out button
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
    },
    callbacks: {
        // async signIn(user, account, profile) { return true },
        // async redirect(url, baseUrl) { return baseUrl },
        async session(session, token) {
            console.log("6", session);
            console.log("7", token);

            if (token.email) {
                const res = await fetch(
                    `${
                        process.env.NODE_ENV === "production"
                            ? process.env.PROD_URL
                            : "http://localhost:3000"
                    }/api/users/getByEmail/` + token.email
                );

                if (res.status === 200) {
                    const resJson = await res.json();

                    console.log(resJson);
                    session.user = resJson;
                }

                // session.user = token.user as any;
            }
            return session;
        },
        // async jwt(token, user, account, profile, isNewUser) {
        //     // console.log("1", token);
        //     // console.log("2", user);
        //     // console.log("3", account);
        //     // console.log("4", profile);
        //     // console.log("5", isNewUser);

        //     if (user?.email) {
        //         const res = await fetch(
        //             `${
        //                 process.env.NODE_ENV === "production"
        //                     ? process.env.PROD_URL
        //                     : "http://localhost:3000"
        //             }/api/users/getByEmail/` + user.email
        //         );

        //         if (res.status === 200) {
        //             const resJson = await res.json();

        //             token.user = resJson;
        //         }
        //     }
        //     return token;
        // },
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},
    theme: "dark",

    debug: false,
    adapter: Adapters.TypeORM.Adapter(process.env.DATABASE_URL as string, {
        models: {
            Account: Adapters.TypeORM.Models.Account,
            Session: Adapters.TypeORM.Models.Session,
            VerificationRequest: Adapters.TypeORM.Models.VerificationRequest,
            User: Models.User as any,
        },
    }),
});
