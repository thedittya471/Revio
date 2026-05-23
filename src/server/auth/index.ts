import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false
    },
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["github"]
        }
    },
    socialProviders: {
        ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? {
            github: {
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET
            }
        } : {})
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 1 week
        updateAge: 60 * 60 * 24,
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5 // 5 minutes
        }
    },
    trustedOrigins: [process.env.BETTER_AUTH_URL!]
});

export type Session = typeof auth.$Infer.Session;