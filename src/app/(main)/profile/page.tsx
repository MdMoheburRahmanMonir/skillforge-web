import { headers } from "next/headers"; 
import ProfileClient from "./ProfileClient";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <ProfileClient />
    );
}