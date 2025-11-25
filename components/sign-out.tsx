"use client"

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"

export function SignOut() {
  return (
    <div>
      <Button variant="outline" onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  )
}