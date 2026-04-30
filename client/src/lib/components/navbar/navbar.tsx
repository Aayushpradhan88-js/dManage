"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconChevronDown, IconLogout, IconUserCircle } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks/customHook";
import { clearPersistedAuthUser, clearUser } from "@/src/lib/store/slices/auth/authSlice";
import { GraduationCap } from "lucide-react";
import { Button } from "../ui/button";

function Navbar() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = useAppSelector((state) => state.auth.user);

    const isAuthenticated = Boolean(user.token);
    console.log("auth user", isAuthenticated)
    const profileHref =
        user.activeRole === "super-admin"
            ? "/super-admin/dashboard"
            : user.activeRole === "admin"
                ? "/institute/admin/dashboard"
                : user.activeRole === "teacher"
                    ? "/teacher/dashboard"
                    : user.activeRole === "student"
                        ? "/student/dashboard"
                        : "/";

    const handleLogout = () => {
        clearPersistedAuthUser();
        dispatch(clearUser());
        setIsMenuOpen(false);
        router.push("/");
    };

    return (
        <header className="sticky inset-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
            <nav className="mx-auto flex max-w-6xl gap-8 px-6 transition-all duration-200 ease-in-out lg:px-12 py-4">
                {/* <div className="relative flex items-center"> */}
                {/* <a href="/">
                        <img src="https://www.svgrepo.com/show/499831/target.svg" loading="lazy" style={{ color: 'transparent' }} width={32} height={32} />
                    </a> */}
                {/* </div> */}
                <div className="flex grow" />
                <div className="hidden items-center justify-center gap-6 md:flex">

                    {isAuthenticated ? (
                        <div>
                            <div className="flex items-center space-x-2">
                                <GraduationCap className="h-8 w-8 text-green-700" />
                                <span className=" text-green-700 text-2xl font-bold">
                                    {/* dManage */}
                                    dManage
                                </span>
                            </div>
                            <div className="hidden md:flex text-black items-center space-x-8">
                                <a href="#features" className="text-sm font-medium hover:bg-slate-300 rounded-4xl p-2 transition">
                                    Features
                                </a>
                                <a href="#how-it-works" className="text-sm font-medium hover:bg-slate-300 rounded-4xl p-2 transition">
                                    How It Works
                                </a>
                                <a href="#pricing" className="text-sm font-medium hover:bg-slate-300 rounded-4xl p-2 transition">
                                    Pricing
                                </a>
                            </div>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsMenuOpen((currentState) => !currentState)}
                                    className="flex items-center gap-2 rounded-full border border-slate-300 px-3 py-2 text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                                >
                                    <IconUserCircle size={20} />
                                    <span className="max-w-28 truncate text-sm font-medium">{user.username}</span>
                                    <IconChevronDown size={16} className={`transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
                                </button>
                           </div>
                            {isMenuOpen && (

                                <div className="absolute right-0 top-14 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                                    <div className="border-b border-slate-100 px-3 py-2">
                                        <p className="truncate text-sm font-semibold text-slate-900">{user.username}</p>
                                        <p className="truncate text-xs text-slate-500">{user.email}</p>
                                        <p className="mt-1 text-xs uppercase tracking-wide text-emerald-700">{user.activeRole}</p>
                                    </div>

                                    <Link
                                        href={profileHref}
                                        className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <IconUserCircle size={18} />
                                        Profile
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                                    >
                                        <IconLogout size={18} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                    <nav className="fixed top-0 w-full z-50 border-b bg-slate-100">
                        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <GraduationCap className="h-8 w-8 text-green-700" />
                                <span className=" text-green-700 text-2xl font-bold">
                                    {/* dManage */}
                                    dManage
                                </span>
                            </div>
                            <div className="hidden md:flex text-black items-center space-x-8">
                                <a href="#features" className="text-sm font-medium hover:bg-slate-300 rounded-4xl p-2 transition">
                                    Features
                                </a>
                                <a href="#how-it-works" className="text-sm font-medium hover:bg-slate-300 rounded-4xl p-2 transition">
                                    How It Works
                                </a>
                                <a href="#pricing" className="text-sm font-medium hover:bg-slate-300 rounded-4xl p-2 transition">
                                    Pricing
                                </a>
                                <Link href="/login">
                                    <Button variant="signupButton">Sign In</Button>
                                </Link>
                                <Link href="/register">
                                    <Button>Get Started</Button>
                                </Link>
                            </div>
                        </div>
                    </nav>
                    )}
                </div>
                <div className="relative flex items-center justify-center md:hidden">
                    <button type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-6 w-auto text-slate-900"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
