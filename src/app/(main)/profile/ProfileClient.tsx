"use client";

import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { EditProfileModal } from "./EditProfileModal";
import { authClient } from "@/lib/auth-client";

export default function ProfileClient() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const defaultAvatar = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=256&h=256";

    const profileImage = user?.image || defaultAvatar;
    const coverImage = user?.coverImage || "";

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
        }
    } as const;

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    if (isPending) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4 flex justify-center items-center">
                <div className="w-full max-w-7xl animate-pulse bg-white dark:bg-slate-950 h-[500px] rounded-3xl" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50/60 dark:bg-slate-900/60 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <motion.div
                className="max-w-7xl mx-auto bg-white dark:bg-slate-950 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-100 dark:border-slate-800/60"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* ১. Premium Cover Photo Section */}
                <div className="h-64 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
                    {coverImage ? (
                        <img
                            src={coverImage}
                            alt="Cover Banner"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                    ) : (
                        <>
                            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </>
                    )}
                </div>

                {/* ২. Profile Details Area */}
                <div className="relative px-6 sm:px-10 pb-10 text-center md:text-left">
                    
                    {/* Avatar & Action Button Row */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between -mt-20 sm:-mt-24 mb-8 px-2">
                        <motion.div
                            className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-white dark:border-slate-950 shadow-xl overflow-hidden mx-auto md:mx-0 bg-slate-100 dark:bg-slate-800 z-10"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <img
                                src={profileImage}
                                alt={user?.name || "User Avatar"}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-5 md:mt-0 z-10">
                            <EditProfileModal
                                currentName={user?.name || ""}
                                currentImage={profileImage}
                                currentCover={coverImage}
                            />
                        </motion.div>
                    </div>

                    {/* Identity Stack */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <motion.div variants={itemVariants} className="space-y-1.5">
                            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                {user?.name || "Guest User"}
                            </h1>
                            <p className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium bg-slate-100 dark:bg-slate-800/60 px-3 py-1 rounded-full">
                                <FaEnvelope className="w-3.5 h-3.5 text-blue-500" />
                                {user?.email || "No email available"}
                            </p>
                        </motion.div>

                        {/* Metadata Badges */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap justify-center md:justify-end gap-3 text-xs font-semibold text-slate-600 dark:text-slate-400"
                        >
                            <span className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/40 px-3 py-1.5 rounded-xl border border-slate-200/40 dark:border-slate-800">
                                <FaMapMarkerAlt className="text-red-500" /> Dhaka, Bangladesh
                            </span>
                            <span className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/40 px-3 py-1.5 rounded-xl border border-slate-200/40 dark:border-slate-800">
                                <FaCalendarAlt className="text-emerald-500" /> Joined June 2026
                            </span>
                        </motion.div>
                    </div>

                    <hr className="my-8 border-slate-100 dark:border-slate-800/80" />

                    {/* ৩. Dashboard Content Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* About Me Section */}
                        <motion.div
                            variants={itemVariants}
                            className="lg:col-span-2 space-y-4 text-left"
                        >
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">About Me</h3>
                            <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/40 space-y-4 shadow-sm">
                                <p className="font-semibold text-slate-900 dark:text-slate-200 text-base">
                                    👋 Hello, I'm {user?.name || "a passionate professional"}.
                                </p>
                                <p>
                                    Welcome to my profile! I am deeply invested in continuous learning, building innovative solutions, and collaborating on meaningful projects. My goal is to transform ideas into reality through clean code and efficient design.
                                </p>
                                <div className="pt-2 flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
                                    <span>🚀 Open to new opportunities & creative collaborations</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Account Overview Sidebar Card */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-6 rounded-2xl flex flex-col justify-between text-left shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Account Overview</h4>
                                <div className="mt-5 space-y-3">
                                    <div className="flex justify-between text-xs font-semibold">
                                        <span className="text-slate-500 dark:text-slate-400">Storage Usage</span>
                                        <span className="text-slate-800 dark:text-slate-200">74% Used</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="w-[74%] h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
                                    </div>
                                </div>
                            </div>

                            {/* Engagement Counters */}
                            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex justify-around text-center">
                                <div className="flex-1">
                                    <span className="block text-2xl font-black text-slate-900 dark:text-white">12k</span>
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5 block">Followers</span>
                                </div>
                                <div className="w-px bg-slate-100 dark:bg-slate-800 self-stretch" />
                                <div className="flex-1">
                                    <span className="block text-2xl font-black text-slate-900 dark:text-white">482</span>
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5 block">Projects</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </motion.div>
        </main>
    );
}