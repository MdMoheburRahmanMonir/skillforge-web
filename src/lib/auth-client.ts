import { jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";


export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL as string,
    plugins: [
        jwtClient(),
        {
            id: "custom-user-fields",
        },
        inferAdditionalFields<typeof auth>()
    ]
})
 