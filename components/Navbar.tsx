"use client"

// import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface NavBarProps {
  isLoggedIn: boolean
}

export function NavBar({ isLoggedIn }: NavBarProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: 'include',
      })

      if (response.ok) {
        // Push to signin first, then refresh
        router.push("/signin")
        router.refresh()
      }
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  return (
    // UPDATED CLASSNAME HERE:
    // 1. sticky top-0 z-50: Keeps navbar pinned to top when scrolling
    // 2. border-border/40: Makes the border subtle/transparent
    // 3. bg-background/60: Sets the color to your app background but 60% opacity
    // 4. backdrop-blur-xl: Applies the heavy blur effect
    <div className="sticky top-0 z-50 flex w-full items-center border-b border-border/40 bg-background/60 p-4 backdrop-blur-xl">
      <NavigationMenu>
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/dashboard">Dashboard</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/notes">Notes</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/snippets">Snippets</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/analytics">Analytics</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/settings">Settings</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="ml-auto flex items-center gap-2">
        {isLoggedIn ? (
          <Button 
            variant="destructive"
            className="cursor-pointer" 
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button variant="ghost" className="cursor-pointer" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button className="cursor-pointer" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}