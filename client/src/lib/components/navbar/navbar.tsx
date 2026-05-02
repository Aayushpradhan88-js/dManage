"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks/customHook";
import { clearPersistedAuthUser, clearUser } from "@/src/lib/store/slices/auth/authSlice";
import { GraduationCap, LogOut, User, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";

function Navbar() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const user = useAppSelector((state) => state.auth.user);
    const isAuthenticated = Boolean(user.token);

    const handleLogout = () => {
        clearPersistedAuthUser();
        dispatch(clearUser());
        router.push("/");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo Section */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="flex h-9 items-center justify-center rounded bg-white px-2 ring-1 ring-slate-200 shadow-sm">
                            <GraduationCap className="h-6 w-6 text-green-700" />
                            <span className="ml-2 text-xl font-bold text-green-700">dManage</span>
                        </div>
                    </Link>

                    {/* Navigation Links (Desktop) */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-sm font-medium text-slate-700 hover:text-green-700 transition-colors">
                            Home
                        </Link>
                        <div className="relative group py-4">
                            <div className="flex items-center gap-1 cursor-pointer text-sm font-medium text-slate-700 hover:text-green-700 transition-colors">
                                Solutions <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                            </div>
                            
                            {/* Hover Dropdown Menu */}
                            <div className="absolute -left-4 top-full hidden group-hover:block pt-2 w-[480px]">
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                                        <div className="space-y-4">
                                            <Link href="/solutions/live-class" className="block text-sm font-medium text-slate-600 hover:text-green-700 transition-colors">
                                                Live Class
                                            </Link>
                                            <Link href="/solutions/course-announcement" className="block text-sm font-medium text-slate-600 hover:text-green-700 transition-colors">
                                                Course Announcement
                                            </Link>
                                            <Link href="/solutions/student-management" className="block text-sm font-medium text-slate-600 hover:text-green-700 transition-colors">
                                                Student Management
                                            </Link>
                                            <Link href="/solutions/quick-announcement" className="block text-sm font-medium text-slate-600 hover:text-green-700 transition-colors">
                                                Quick Announcement
                                            </Link>
                                        </div>
                                        <div className="space-y-4">
                                            <Link href="/solutions/progress-tracking" className="block text-sm font-medium text-slate-600 hover:text-green-700 transition-colors">
                                                Progress Tracking
                                            </Link>
                                            <Link href="/solutions/revenue-calculation" className="block text-sm font-medium text-slate-600 hover:text-green-700 transition-colors">
                                                Monthly Revenue Calculation
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link href="#features" className="text-sm font-medium text-slate-700 hover:text-green-700 transition-colors">
                            Features
                        </Link>
                        <Link href="#pricing" className="text-sm font-medium text-slate-700 hover:text-green-700 transition-colors">
                            Pricing
                        </Link>
                        <Link href="#docs" className="text-sm font-medium text-slate-700 hover:text-green-700 transition-colors">
                            Docs
                        </Link>
                        <Link href="#blog" className="text-sm font-medium text-slate-700 hover:text-green-700 transition-colors">
                            Blog
                        </Link>
                    </nav>
                </div>

                {/* Right side actions */}
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <Link href="/institute/becomeInstitute" className="hidden sm:block">
                                <Button className="bg-green-700 hover:bg-green-800 text-white rounded-lg px-4 h-10 shadow-sm border-0">
                                    Register Your Institute
                                </Button>
                            </Link>
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-slate-200 hover:border-slate-300">
                                        <User className="h-6 w-6 text-slate-700" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-64 mt-2 rounded-xl border-slate-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in duration-200">
                                    <DropdownMenuLabel className="font-normal px-2 py-3">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-semibold text-slate-900">{user.username}</p>
                                            <p className="text-xs text-slate-500">{user.email}</p>
                                            <p className="mt-1.5 inline-flex w-fit items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                                                {user.activeRole}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-slate-100" />
                                    <DropdownMenuItem asChild className="focus:bg-slate-50 focus:text-slate-900 cursor-pointer rounded-lg">
                                        <Link href="/profile" className="flex items-center gap-3 px-2 py-2.5 text-sm text-slate-700">
                                            <User className="h-4 w-4" />
                                            <span>My Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-slate-100" />
                                    <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-3 px-2 py-2.5 text-sm text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer rounded-lg mt-1">
                                        <LogOut className="h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link href="/login">
                                <Button variant="ghost" className="text-slate-700 hover:bg-slate-50 hover:text-slate-900 h-10 px-4">Sign In</Button>
                            </Link>
                            <Link href="/register">
                                <Button className="bg-green-700 hover:bg-green-800 text-white h-10 px-5 rounded-lg shadow-sm border-0">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
