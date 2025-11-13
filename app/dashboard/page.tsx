import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

  if (!token) redirect("/signin");

  const user = verifyToken(token);
  if (!user) redirect("/signin");

  return <DashboardClient />;
}
