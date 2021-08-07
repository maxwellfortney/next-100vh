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
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // Providers.Twitter({
        //     clientId: process.env.TWITTER_ID,
        //     clientSecret: process.env.TWITTER_SECRET,
        // }),
        // Providers.Auth0({
        //     clientId: process.env.AUTH0_ID,
        //     clientSecret: process.env.AUTH0_SECRET,
        //     domain: process.env.AUTH0_DOMAIN,
        // }),
    ],
    // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
    // https://next-auth.js.org/configuration/databases
    //
    // Notes:
    // * You must install an appropriate node_module for your database
    // * The Email provider requires a database (OAuth providers do not)
    // database: process.env.DATABASE_URL,

    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.SECRET,
    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `jwt` is automatically set to `true` if no database is specified.
        jwt: true,

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },

    // JSON Web tokens are only used for sessions if the `jwt: true` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
        // A secret to use for key generation (you should set this explicitly)
        // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
        // Set to true to use encryption (default: false)
        // encryption: true,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        // encode: async ({ secret, token, maxAge }) => {},
        // decode: async ({ secret, token, maxAge }) => {},
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
        signIn: "/signin", // Displays signin buttons
        // signOut: "/", // Displays form with sign out button
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        // async signIn(user, account, profile) { return true },
        // async redirect(url, baseUrl) { return baseUrl },
        async session(session, token) {
            // console.log("4", token);
            // console.log("5", session);

            // (session.user as any).username =
            //     user.username || (session.user as any).username;
            // (session.user as any).projectLikes =
            //     user.projectLikes || (session.user as any).projectLikes;
            // (session.user as any).following =
            //     user.following || (session.user as any).following;
            // (session.user as any).followers =
            //     user.followers || (session.user as any).followers;
            // (session.user as any).bio = user.bio || (session.user as any).bio;
            // (session.user as any).skills =
            //     user.skills || (session.user as any).skills;
            // (session.user as any).createdAt =
            //     user.createdAt || (session.user as any).createdAt;
            // (session.user as any).image =
            //     user.image || (session.user as any).image;
            // (session.user as any).isVerified =
            //     user.isVerified || (session.user as any).isVerified;
            if (token.user) {
                session.user = token.user as any;
            }
            return session;
        },
        async jwt(token, user, account, profile, isNewUser) {
            // console.log("1", token);
            // console.log("2", user);
            // console.log("3", profile);
            // console.log(account);

            // console.log(user);
            // console.log((user as any)?.username);

            if (user?.email) {
                const res = await fetch(
                    "http://localhost:3000/api/users/getByEmail/" + user?.email
                );

                if (res.status === 200) {
                    const resJson = await res.json();

                    token.user = resJson;
                }
            }

            //   token.username = token.username || (user as any)?.username || null;
            //   token.projectLikes =
            //     token.projectLikes || (user as any).projectLikes || null;

            // if (typeof user !== typeof undefined) {
            //     token.user = user;
            // }
            return token;
        },
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // You can set the theme to 'light', 'dark' or use 'auto' to default to the
    // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
    theme: "dark",

    // Enable debug messages in the console if you are having problems
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
