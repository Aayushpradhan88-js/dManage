"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks/customHook";
import { clearPersistedAuthUser, clearUser } from "@/src/lib/store/slices/auth/authSlice";
import {
    BadgeCheck,
    ChevronDown,
    GraduationCap,
    Home,
    LayoutDashboard,
    LogOut,
    Settings,
    User,
} from "lucide-react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { resolveCoursesPath, resolveDashboardPath } from "@/src/features/auth/utils/auth-session";

function Navbar() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const user = useAppSelector((state) => state.auth.user);
    const isAuthenticated = Boolean(user.token);
    const dashboardPath = resolveDashboardPath(user);
    const coursesPath = resolveCoursesPath(user);

    const handleLogout = () => {
        clearPersistedAuthUser();
        dispatch(clearUser());
        router.push("/");
    };

    return (
        <header className="sticky top-0 z-50 border-b border-[color:var(--border-soft)] bg-white">
            <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="flex h-11 items-center justify-center rounded-xl border border-[color:var(--border-soft)] bg-[color:var(--surface)] px-4 shadow-sm">
                            <GraduationCap className="h-6 w-6 text-[color:var(--brand)]" />
                            <span className="ml-2 text-[1.85rem] font-bold tracking-tight text-[color:var(--brand)]">dManage</span>
                        </div>
                    </Link>

                    <nav className="hidden items-center space-x-7 lg:flex">
                        <Link href="/" className="text-sm font-medium text-slate-600 transition-colors hover:text-[color:var(--brand)]">
                            Home
                        </Link>
                        <div className="relative group py-4">
                            <div className="flex cursor-pointer items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-[color:var(--brand)]">
                                Solutions <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                            </div>

                            <div className="absolute -left-4 top-full hidden group-hover:block pt-2 w-[480px]">
                                <div className="animate-in slide-in-from-top-2 fade-in rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface)] p-6 shadow-2xl duration-200">
                                    <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                                        <div className="space-y-4">
                                            <Link href="/solutions/live-class" className="block text-sm font-medium text-slate-600 transition-colors hover:text-[color:var(--brand)]">
                                                Live Class
                                            </Link>
                                            <Link href="/solutions/course-announcement" className="block text-sm font-medium text-slate-600 transition-colors hover:text-[color:var(--brand)]">
                                                Course Announcement
                                            </Link>
                                            <Link href="/solutions/student-management" className="block text-sm font-medium text-slate-600 transition-colors hover:text-[color:var(--brand)]">
                                                Student Management
                                            </Link>
                                            <Link href="/solutions/quick-announcement" className="block text-sm font-medium text-slate-600 transition-colors hover:text-[color:var(--brand)]">
                                                Quick Announcement
                                            </Link>
                                        </div>
                                        <div className="space-y-4">
                                            <Link href="/solutions/progress-tracking" className="block text-sm font-medium text-slate-600 transition-colors hover:text-[color:var(--brand)]">
                                                Progress Tracking
                                            </Link>
                                            <Link href="/solutions/revenue-calculation" className="block text-sm font-medium text-slate-600 transition-colors hover:text-[color:var(--brand)]">
                                                Monthly Revenue Calculation
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link href="#features" className="text-sm font-medium text-slate-600 transition-colors hover:text-[color:var(--brand)]">
                            Features
                        </Link>
                        <Link href="/platforms" className="text-sm font-medium text-slate-600 transition-colors hover:text-[color:var(--brand)]">
                            Find Platforms
                        </Link>
                        <Link href="#pricing" className="text-sm font-medium text-slate-600 transition-colors hover:text-[color:var(--brand)]">
                            Pricing
                        </Link>
                        <Link href="#docs" className="text-sm font-medium text-slate-600 transition-colors hover:text-[color:var(--brand)]">
                            Docs
                        </Link>
                        <Link href="#blog" className="text-sm font-medium text-slate-600 transition-colors hover:text-[color:var(--brand)]">
                            Blogs
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <Link href="/platform/apply">
                                <Button className="h-11 rounded-xl border-0 bg-[color:var(--brand)] px-5 text-white shadow-sm hover:bg-[color:var(--brand-strong)]">
                                    Register Your Platform
                                </Button>
                            </Link>
                            {/* <Link href={dashboardPath}>
                                <Button
                                    variant="ghost"
                                    className="h-11 rounded-xl border border-[color:var(--border-soft)] bg-[color:var(--brand-soft)] px-5 font-semibold text-[color:var(--brand-strong)] hover:bg-[color:var(--brand-soft)]/80"
                                >
                                    Dashboard
                                </Button>
                            </Link> */}

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-11 w-11 rounded-full border border-[color:var(--border-soft)] bg-white hover:border-[color:var(--brand-soft)] hover:bg-[color:var(--surface-muted)]"
                                    >
                                        <User className="h-5 w-5 text-slate-600" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="mt-3 w-72 rounded-2xl border-[color:var(--border-soft)] bg-white p-2 shadow-xl"
                                >
                                    <DropdownMenuLabel className="px-3 py-3 font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-semibold text-slate-900">{user.email}</p>
                                            <p className="text-xs text-[color:var(--muted-foreground)]">{user.username}</p>
                                            <p className="mt-1.5 inline-flex w-fit items-center rounded-md bg-[color:var(--brand-soft)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[color:var(--brand-strong)]">
                                                {user.activeRole}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-[color:var(--border-soft)]" />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem asChild className="cursor-pointer rounded-xl px-3 py-2.5 text-slate-700 focus:bg-[color:var(--surface-muted)] focus:text-slate-900">
                                            <Link href={dashboardPath} className="flex items-center gap-3 text-sm">
                                                <Home className="h-4 w-4" />
                                                <span>Dashboard</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="cursor-pointer rounded-xl px-3 py-2.5 text-slate-700 focus:bg-[color:var(--surface-muted)] focus:text-slate-900">
                                            <Link href="/profile" className="flex items-center gap-3 text-sm">
                                                <BadgeCheck className="h-4 w-4" />
                                                <span>Account Preferences</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="cursor-pointer rounded-xl px-3 py-2.5 text-slate-700 focus:bg-[color:var(--surface-muted)] focus:text-slate-900">
                                            <Link href={coursesPath} className="flex items-center gap-3 text-sm">
                                                <LayoutDashboard className="h-4 w-4" />
                                                <span>Your Courses</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="cursor-pointer rounded-xl px-3 py-2.5 text-slate-700 focus:bg-[color:var(--surface-muted)] focus:text-slate-900">
                                            <Link href="/profile" className="flex items-center gap-3 text-sm">
                                                <Settings className="h-4 w-4" />
                                                <span>My Profile</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator className="bg-[color:var(--border-soft)]" />
                                    {/* <div className="px-3 py-2">
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                                            Theme
                                        </p>
                                        <DropdownMenuRadioGroup value="light">
                                            <DropdownMenuRadioItem value="system" className="rounded-lg px-2 text-sm text-slate-600">
                                                System
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="dark" className="rounded-lg px-2 text-sm text-slate-600">
                                                Dark
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="light" className="rounded-lg px-2 text-sm text-slate-900">
                                                Light
                                            </DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </div> */}
                                    <DropdownMenuSeparator className="bg-[color:var(--border-soft)]" />
                                    <DropdownMenuItem onClick={handleLogout} className="mt-1 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:bg-red-50 focus:text-red-700">
                                        <LogOut className="h-4 w-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link href="/login">
                                <Button variant="ghost" className="h-11 rounded-xl px-4 text-slate-700 hover:bg-[color:var(--surface-muted)] hover:text-slate-900">Sign In</Button>
                            </Link>
                            <Link href="/register">
                                <Button className="h-11 rounded-xl border-0 bg-[color:var(--brand)] px-5 text-white shadow-sm hover:bg-[color:var(--brand-strong)]">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
