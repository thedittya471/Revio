"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signUp, signIn } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FaGithub } from "react-icons/fa"
export default function SignUpPage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        const result = await signUp.email({
            name, email, password,
        })

        if (result.error) {
            setError(result.error.message || "An error occurred")
            setLoading(false)
        } else {
            router.push("/repos")
        }
    }

    const handleGithubSignIn = async () => {
        setEmail("")
        setLoading(true)

        await signIn.social({
            provider: "github",
            callbackURL: "/repos"
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">SignUp</CardTitle>
                    <CardDescription>
                        Sign up with your email or Github account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button variant="outline" onClick={handleGithubSignIn} disabled={loading} className="w-full">
                        <FaGithub className="mr-2 size-4" />
                        Sign up with Github
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                                Or Continue with email
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleEmailSignUp} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={loading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading} />
                        </div>

                        {error && <p className="text-red-500">{error}</p>}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Loading..." : "SignUp"}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account? <Link href="/signIn" className="underline underline-offset-4 hover:text-primary">SignIn</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

