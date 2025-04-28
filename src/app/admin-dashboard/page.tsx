import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminPage() {
  return <div className="container">Admin Dashboard <Button asChild><Link href="/">Go Home</Link></Button></div>
}
