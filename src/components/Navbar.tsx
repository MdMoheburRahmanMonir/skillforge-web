"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  GraduationCap,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
];

const authLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/ai/recommendations", label: "AI Recommend" },
  { href: "/ai/chat", label: "AI Chat" },
  { href: "/ai/generate", label: "AI Generator" },
  { href: "/items/add", label: "Add Course" },
  { href: "/items/manage", label: "Manage" },
  { href: "/blog", label: "Blog" },
  { href: "/profile", label: "Profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false); // Mobile menu state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Desktop dropdown state
  const dropdownRef = useRef<HTMLDivElement>(null);

  const links = user ? authLinks : publicLinks;

  const handleLogout = async () => {
    setDropdownOpen(false);
    setOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };
 
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-md">
      <div className="container-main flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-primary"
        >
          <GraduationCap className="h-7 w-7" />
          <span>
            SkillForge<span className="text-secondary">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${pathname === link.href
                ? "bg-primary/10 text-primary"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-primary"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Side Profile / Auth */}
        <div className="hidden lg:flex items-center gap-3">
          {!isPending && !user && (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-primary"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="btn-primary px-5 py-2 text-sm"
              >
                Get Started
              </Link>
            </>
          )}

          {!isPending && user && (
            <div className="relative" ref={dropdownRef}>
              {/* Trigger Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-2 py-1 transition hover:bg-neutral-50"
              >
                <img
                  src={
                    user.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name || "User"
                    )}&background=2563eb&color=fff`
                  }
                  alt={user.name ?? ""}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <div className="hidden xl:flex flex-col items-start">
                  <span className="text-sm font-semibold text-neutral-800">
                    {user.name}
                  </span>
                  <span className="max-w-[180px] truncate text-xs text-neutral-500">
                    {user.email}
                  </span>
                </div>

                <ChevronDown className={`h-4 w-4 text-neutral-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Desktop Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl border border-neutral-200 bg-white p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Profile Header Inside Dropdown */}
                  <div className="flex items-center gap-3 p-3 border-b border-neutral-100">
                    <img
                      src={
                        user.image ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name || "User"
                        )}&background=2563eb&color=fff`
                      }
                      alt={user.name ?? ""}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col min-w-0">
                      <p className="truncate text-sm font-semibold text-neutral-800">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-neutral-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Links Inside Dropdown */}
                  <div className="mt-2 space-y-1">
                    {links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setDropdownOpen(false)}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${pathname === link.href
                          ? "bg-primary/10 text-primary"
                          : "text-neutral-600 hover:bg-neutral-100 hover:text-primary"
                          }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  {/* Logout Action */}
                  <div className="mt-2 border-t border-neutral-100 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburgur Button */}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 lg:hidden"
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Responsive Navigation */}
      {open && (
        <div className="space-y-2 border-t border-neutral-200 bg-white px-4 py-4 lg:hidden">
          {user && (
            <div className="mb-4 flex items-center gap-3 border-b border-neutral-200 pb-4">
              <img
                src={
                  user.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name || "User"
                  )}`
                }
                alt={user.name ?? ""}
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <p className="font-semibold text-neutral-800">
                  {user.name}
                </p>
                <p className="text-sm text-neutral-500">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-xl px-4 py-3 text-sm font-medium ${pathname === link.href
                ? "bg-primary/10 text-primary"
                : "text-neutral-600 hover:bg-neutral-100"
                }`}
            >
              {link.label}
            </Link>
          ))}

          {!user && !isPending ? (
            <div className="space-y-2 pt-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block w-full rounded-xl border border-neutral-200 py-3 text-center"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="btn-primary block w-full text-center"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 py-3 text-red-500 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}