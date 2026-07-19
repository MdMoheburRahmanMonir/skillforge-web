import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins"


const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI as string);
const db = client.db('skillforge'); // Replace with your database name

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
    //...other options
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,

    },
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    user: {
        additionalFields: {
            coverImage: {
                type: "string",
                required: false,
            },
        },
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            strategy: "jwt"
        },
    },
    plugins: [
        jwt(),
        {
            id: "custom-user-fields",
            schema: {
                user: {
                    fields: {
                        coverImage: {
                            type: "string",
                            required: false,
                        },
                    },
                },
            },
        },
    ],
});