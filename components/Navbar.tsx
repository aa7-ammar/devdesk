"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  
} from "@/components/ui/navigation-menu"
import { LogOut } from "lucide-react"

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
        router.push("/signin")
        router.refresh()
      }
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  // Custom style for nav links
  const navLinkClass = "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground focus:bg-white/5 focus:text-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-white/5 data-[state=open]:bg-white/5";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Logo Section */}
        <Link href="/" className="mr-8 flex items-center gap-2 transition-opacity hover:opacity-90">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold text-sm shadow-[0_0_10px_rgba(99,102,241,0.1)]">
            &gt;_
          </div>
          <span className="hidden font-bold sm:inline-block tracking-tight">DevDesk</span>
        </Link>

        {/* Navigation Links */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            
            {/* FIX: Use NavigationMenuLink asChild, then put Link inside */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navLinkClass}>
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navLinkClass}>
                <Link href="/dashboard">Dashboard</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navLinkClass}>
                <Link href="/notes">Notes</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navLinkClass}>
                <Link href="/snippets">Snippets</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navLinkClass}>
                <Link href="/analytics">Analytics</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center gap-3">
          {isLoggedIn ? (
             <>
               <Button variant="ghost" className="text-muted-foreground hover:text-foreground h-9" asChild>
                  <Link href="/settings">Settings</Link>
               </Button>

               <Button 
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors gap-2" 
                onClick={handleLogout}
               >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground h-9" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all h-9" 
                asChild
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}