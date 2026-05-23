import {Button} from "@/components/ui/button"
import { HealthCheck } from "@/components/ui/health-check"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <h1>Welcome to Revio</h1>
        <p>start reviewing your code today</p>
      </div>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/signIn">SignIn</Link>
        </Button>
        <Button asChild>
          <Link href="/signUp">SignUp</Link>
        </Button>
      </div>
      <HealthCheck />
    </div>
  )
}