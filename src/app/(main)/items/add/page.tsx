"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { Plus, Sparkles, UploadCloud } from "lucide-react";
import { toast } from "react-toastify";


type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

interface CourseFormState {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  category: string;
  level: CourseLevel;
  duration: string;
  instructor: string;
  courseImage: string;
  location: string;
  creatorId?: string | null | undefined;
  creatorImage?: string | number | null | undefined;
  creatorName?: string | null | undefined;
  creatorEmail?: string | number| null | undefined;
}

function AddCourseForm() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState<CourseFormState>({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    category: "",
    level: "Beginner",
    duration: "",
    instructor: user?.name || "",
    courseImage: "",
    location: "Online",
    creatorId: user?.id,
    creatorImage: user?.image,
    creatorName: user?.name,
    creatorEmail: user?.email,
  });

  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [classifying, setClassifying] = useState(false);
  const [uploading, setUploading] = useState(false);

  const mutation = useMutation({
    mutationFn: () => {
      return api.courses.create({
        ...form,
        price: parseFloat(form.price) || 0,
        tags,
      });
    },
    onSuccess: () => {
      setSuccess("Course added successfully!");
      setError("");
      setTimeout(() => router.push("/items/manage"), 1500);
    },
    onError: (err: Error) => {
      setError(err.message || "Something went wrong.");
      setSuccess("");
    },
  });

  const handleClassify = async () => {
    if (!form.title) return;
    setClassifying(true);
    try {
      const result = await api.ai.classify(form.title, form.shortDescription);
      setForm((f) => ({
        ...f,
        category: result.category || f.category,
        level: (result.level as CourseLevel) || f.level,
      }));
      if (result.tags) setTags(result.tags);
    } catch {
      /* ignore */
    } finally {
      setClassifying(false);
    }
  };

  const update = (field: keyof CourseFormState, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image Size Should be less than 5 MB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      const imageUrl = data?.data?.url;
      if (!imageUrl) throw new Error("No URL returned");
      setForm((prev) => ({ ...prev, courseImage: imageUrl }));
      toast.success("Image uploaded successfully!");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (isSessionPending) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-neutral-500 font-medium">Loading session...</p>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-main max-w-2xl">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Add New Course</h1>
        <p className="text-neutral-600 mb-8">Create a new course listing for the platform</p>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl">{error}</div>}
        {success && <div className="mb-4 p-3 bg-emerald-50 text-emerald-600 text-sm rounded-xl">{success}</div>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
          className="card p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="input-field"
              placeholder="Course title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Short Description *</label>
            <textarea
              required
              rows={2}
              value={form.shortDescription}
              onChange={(e) => update("shortDescription", e.target.value)}
              className="input-field"
              placeholder="Brief summary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Full Description *</label>
            <textarea
              required
              rows={4}
              value={form.fullDescription}
              onChange={(e) => update("fullDescription", e.target.value)}
              className="input-field"
              placeholder="Detailed course description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price ($) *</label>
              <input
                required
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration *</label>
              <input
                required
                value={form.duration}
                onChange={(e) => update("duration", e.target.value)}
                className="input-field"
                placeholder="e.g. 8 weeks"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <input
                required
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="input-field"
                placeholder="e.g. Web Development"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Level</label>
              <select
                value={form.level}
                onChange={(e) => update("level", e.target.value as CourseLevel)}
                className="input-field"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Instructor *</label>

              <input
                required
                value={form.instructor}
                onChange={(e) => update("instructor", e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-xs font-semibold text-black mb-1.5 tracking-wide">
              Course Image *
            </label>
            <div className="relative flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 px-4">
                  {form.courseImage ? (
                    <img
                      src={form.courseImage}
                      alt="Preview"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                    <UploadCloud className="w-6 h-6 text-black" />
                  )}
                  <div className="flex flex-col text-left">
                    <p className="text-xs font-semibold text-slate-700">
                      {uploading
                        ? "Uploading..."
                        : form.courseImage
                          ? "Image uploaded successfully"
                          : "Click to upload Photo"}
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

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClassify}
              disabled={classifying || !form.title}
              className="btn-outline flex-1 text-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> {classifying ? "Classifying..." : "AI Auto-Classify"}
            </button>
            <button
              type="submit"
              disabled={mutation.isPending || uploading || !form.courseImage}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> {mutation.isPending ? "Submitting..." : "Add Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AddCoursePage() {
  return (
    <ProtectedRoute>
      <AddCourseForm />
    </ProtectedRoute>
  );
}