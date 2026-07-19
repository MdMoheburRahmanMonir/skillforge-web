import Link from "next/link";
import Image from "next/image";
import { Star, Clock, MapPin } from "lucide-react";
import type { Course } from "@/lib/types";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="card flex flex-col h-full overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
          {course.category}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 text-accent">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold text-neutral-800">{course.rating}</span>
            <span className="text-xs text-neutral-500">({course.reviewCount})</span>
          </div>
          <span className="text-xs px-2 py-0.5 bg-neutral-100 rounded-full text-neutral-600">{course.level}</span>
        </div>
        <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-neutral-600 mb-4 line-clamp-2 flex-1">{course.shortDescription}</p>
        <div className="flex items-center gap-3 text-xs text-neutral-500 mb-4">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{course.location}</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
          <span className="text-lg font-bold text-primary">${course.price}</span>
          <Link href={`/courses/${course._id}`} className="btn-primary text-sm py-2 px-4">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="h-48 skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-4 skeleton rounded w-1/3" />
        <div className="h-5 skeleton rounded w-full" />
        <div className="h-4 skeleton rounded w-full" />
        <div className="h-4 skeleton rounded w-2/3" />
        <div className="flex justify-between pt-4">
          <div className="h-6 skeleton rounded w-16" />
          <div className="h-9 skeleton rounded-xl w-28" />
        </div>
      </div>
    </div>
  );
}
