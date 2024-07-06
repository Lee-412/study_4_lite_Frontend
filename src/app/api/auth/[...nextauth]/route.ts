import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt";
import { Password } from "@mui/icons-material";
import { error } from "console";
import { sendRequest } from "@/utils/api";

export const authOptions: AuthOptions = {

    secret: process.env.NO_SECRET,
    providers: [

        CredentialsProvider({
            name: "Study",

            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/auth/local`,
                    method: "POST",
                    body: {
                        username: credentials?.username,
                        password: credentials?.password
                    },
                })

                if (res && res.data) {
                    // Any object returned will be saved in `user` property of the JWT
                    return res.data as any;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    throw new Error(res?.message as string);
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),

    ],
    callbacks: {

        async jwt({ token, user, account, profile, trigger }) {
            if (trigger === "signIn" && account?.provider !== "credentials") {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/auth/local`,
                    method: "POST",
                    body: {
                        type: account?.provider?.toLocaleUpperCase,
                        username: user.email,
                    }
                })
                if (res.data) {
                    token.access_token = res.data?.access_token;
                    token.refresh_token = res.data.refresh_token;
                    token.user = res.data.user;
                }
            } if (trigger === "signIn" && account?.provider === "credentials") {
                //@ts-ignore
                token.access_token = user.access_token;
                //@ts-ignore
                token.refresh_token = user.refresh_token;
                //@ts-ignore
                token.user = user.user;

            }

            return token;
        },
        async session({ session, token, user }) {
            // session.user.email = token.address;
            if (token) {
                session.access_token = token.access_token;
                session.refresh_token = token.refresh_token;
                session.user = token.user;
            }
            return session
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }