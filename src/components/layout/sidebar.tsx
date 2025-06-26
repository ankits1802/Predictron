'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/icons";
import { cn } from '@/lib/utils';
import { navItems } from '@/lib/nav-config';

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden border-r bg-card md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-foreground">
                        <Logo className="h-6 w-6 text-primary" />
                        <span className="">Predictron</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                    pathname === item.href && "bg-primary/10 text-primary"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                                {item.label === 'Maintenance Logs' && (
                                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                        6
                                    </Badge>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
