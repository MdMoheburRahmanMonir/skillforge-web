"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, UserPlus, Command, GraduationCap, UploadCloud } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) { router.push("/"); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (password !== confirm) { setError("Passwords do not match"); return; }
    setLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
        callbackURL: "/login",
      });
      if (data) {
        toast.success("Account created successfully! Please check your email to verify your account.");
        router.push("/login");
      }
      if (error) {
        setError(error.message || "SignUp failed — check credentials.");
      }
      console.log(data, error, 'the image is ');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: "/",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image Size Should be less than 5 MB');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(`${data?.data?.url}`, 'the image url is');
      setImage(`${data?.data?.url}`);
      toast.success('Image uploaded successfully!');
    } catch (err) {
      toast.error('Image upload failed');
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-1 sm:p-4 md:p-8 lg:p-16 bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')`
      }}
    >
      {/* Background Soft Overlay for Text Readability */}
      <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />

      {/* FLOATING SIGNUP CARD CONTAINER */}
      <div className="w-full max-w-[560px] z-10 flex flex-col mt-16 sm:mt-0">

        {/* The Clean White Rounded Card */}
        <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 transition-all duration-300 overflow-y-auto custom-scrollbar">

          {/* Header Block */}
          <div className="text-center mb-6">
            <Link
              href="/"
              className="flex items-center justify-center text-center gap-2 text-xl font-bold text-slate-900"
            >
              <GraduationCap className="h-7 w-7 text-blue-600" />
              <span>
                SkillForge<span className="text-blue-600">AI</span>
              </span>
            </Link>
            <p className="text-xs text-black mt-1 font-medium">
              Start your AI-powered learning journey
            </p>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {/* Form Stack */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Styled Image Upload Dropzone Component */}
            <div>
              <label htmlFor="imageUrl" className="block text-xs font-semibold text-black mb-1.5 tracking-wide">
                Profile Image
              </label>
              <div className="relative flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3 px-4">
                    {image ? (
                      <img src={image} alt="Preview" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                    ) : (
                      <UploadCloud className="w-6 h-6 text-black" />
                    )}
                    <div className="flex flex-col text-left">
                      <p className="text-xs font-semibold text-slate-700">
                        {image ? "Image uploaded successfully" : "Click to upload Photo"}
                      </p>
                      <p className="text-[10px] text-black">Max size 5MB (JPG, PNG)</p>
                    </div>
                  </div>
                  <input
                    id="imageUrl"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Full Name Input */}
            <div>
              <label className="block text-xs font-semibold text-black mb-1.5 tracking-wide">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 outline-none transition-all font-medium"
                placeholder="John Doe"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold text-black mb-1.5 tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 outline-none transition-all font-medium"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-black mb-1.5 tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 outline-none transition-all font-medium"
                  placeholder="Min 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black hover:text-slate-600 p-0.5 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-xs font-semibold text-black mb-1.5 tracking-wide">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/5 outline-none transition-all font-medium"
                placeholder="Repeat password"
              />
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-slate-800 hover:bg-slate-900 active:scale-[0.99] text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-slate-950/10 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? "Creating..." : "Create Account"}</span>
            </button>
          </form>

          {/* Clean UI Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-100" />
            <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase">OR</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Google Authentic Integration Option */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full py-2.5 border border-slate-200 bg-white text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Continue with Google</span>
          </button>

        </div>

        {/* Footer Navigation Switcher */}
        <p className="text-center text-xs font-medium text-white mt-5 bg-white/60 backdrop-blur-sm sm:bg-transparent py-2 px-4 rounded-full self-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-bold hover:underline underline-offset-4 transition-all">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}