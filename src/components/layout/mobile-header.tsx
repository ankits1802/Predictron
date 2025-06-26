"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Bell, Menu } from "lucide-react";
import { Logo } from "../icons";
import { navItems } from "@/lib/nav-config";
import { cn } from "@/lib/utils";


export function MobileHeader() {
    const pathname = usePathname();
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 text-lg font-semibold mb-4"
                        >
                            <Logo className="h-6 w-6 text-primary" />
                            <span className="">ProactiveShield</span>
                        </Link>
                         {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                                    pathname === item.href && "text-foreground"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>

            <div className="w-full flex-1">
                 <h1 className="text-xl font-semibold">ProactiveShield</h1>
            </div>

             <Button variant="outline" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
            </Button>
        </header>
    )
}
