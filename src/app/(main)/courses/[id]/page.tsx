"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import CourseCard from "@/components/CourseCard";
import { Star, Clock, MapPin, User, Tag } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify"; 

export default function CourseDetailPage() {
  const router = useRouter();
  const {data: session } = authClient.useSession();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: () => api.courses.get(id),
    enabled: !!id,
  });
  console.log(data, 'the course data');
  if (isLoading) {
    return (
      <div className="section-padding">
        <div className="container-main animate-pulse">
          <div className="h-80 skeleton rounded-2xl mb-8" />
          <div className="h-8 skeleton rounded w-2/3 mb-4" />
          <div className="h-4 skeleton rounded w-full mb-2" />
          <div className="h-4 skeleton rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (!data) return <div className="section-padding text-center">Course not found</div>;

  // const { course, reviews, related } = data;
  const course = data?.data;
  if (!course) return <div>Course not found</div>;
  return (
    <div className="section-padding">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-6">
              <img src={course.courseImage} alt={course.title} className="object-cover" />
            </div>
            {/* {course.images.length > 1 && (
              <div className="flex gap-3 mb-8 overflow-x-auto">
                {course.images.map((img, i) => (
                  <div key={i} className="relative w-32 h-20 rounded-xl overflow-hidden shrink-0">
                    <Image src={img} alt={`${course.title} ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )} */}
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">{course.title}</h1>
            <p className="text-neutral-600 leading-relaxed mb-8">{course.fullDescription}</p>

            <div className="card p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Course Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div><span className="text-xs text-neutral-500">Category</span><p className="font-medium">{course.category}</p></div>
                <div><span className="text-xs text-neutral-500">Level</span><p className="font-medium">{course.level}</p></div>
                <div><span className="text-xs text-neutral-500">Duration</span><p className="font-medium">{course.duration}</p></div>
                <div><span className="text-xs text-neutral-500">Location</span><p className="font-medium">{course.location}</p></div>
              </div>
            </div>

            {/* {reviews.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Reviews ({reviews.length})</h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review._id} className="card p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.userName}</span>
                        <div className="flex text-accent">{Array.from({ length: review.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                      </div>
                      <p className="text-sm text-neutral-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </div>

          <div>
            <div className="card p-6 sticky top-24">
              <div className="text-3xl font-bold text-primary mb-4">${course.price}</div>
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex items-center gap-2 text-neutral-600"><Star className="w-4 h-4 text-accent fill-accent" /> {course.rating} ({course.reviewCount} reviews)</div>
                <div className="flex items-center gap-2 text-neutral-600"><Clock className="w-4 h-4" /> {course.duration}</div>
                <div className="flex items-center gap-2 text-neutral-600"><MapPin className="w-4 h-4" /> {course.location}</div>
                <div className="flex items-center gap-2 text-neutral-600"><User className="w-4 h-4" /> {course.instructor}</div>
              </div>
              {/* {course.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-600">
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              )} */}
              <button onClick={() => {
                if (session?.user) {
                  toast.success("Enrolled successfully!");
                }
                else {
                  toast.error("Please log in to enroll in the course.");
                  router.push("/login");
                }
              }} className="btn-primary w-full text-center">Enroll Now</button>
            </div>
          </div>
        </div>

        {/* {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((c) => <CourseCard key={c._id} course={c} />)}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
