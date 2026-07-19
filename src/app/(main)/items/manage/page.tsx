"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import { api } from "@/lib/api";
import { Eye, Trash2, Star } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";

function ManageCourses() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const id = session?.user?.id;


  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["my-courses"],
    queryFn: () => api.courses.my(id as string),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.courses.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-courses"] }),
  });

  const courses = data?.data || [];
  console.log(data, 'the user courses data', courses);
  return (
    <div className="section-padding">
      <div className="container-main">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Manage Courses</h1>
            <p className="text-neutral-600 mt-1">{courses.length} courses in your account</p>
          </div>
          <Link href="/items/add" className="btn-primary text-sm">Add New Course</Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 skeleton rounded-2xl" />)}</div>
        ) : courses.length === 0 ? (
          <div className="card p-12 text-center text-neutral-500">
            <p className="mb-4">No courses yet. Add your first course!</p>
            <Link href="/items/add" className="btn-primary text-sm">Add Course</Link>
          </div>
        ) : (
          <>
            <div className="hidden md:block card overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-neutral-600">Course</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-600">Category</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-600">Price</th>
                    <th className="text-right p-4 text-sm font-medium text-neutral-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                            <img src={course.courseImage} alt={course.title} className="object-cover" />
                          </div>
                          <span className="font-medium text-sm line-clamp-1">{course.title}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-neutral-600">{course.category}</td>
                      <td className="p-4 text-sm font-medium">${course.price}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/courses/${course._id}`} className="p-2 text-primary hover:bg-primary/10 rounded-lg"><Eye className="w-4 h-4" /></Link>
                          <AlertDialog>
                            <Button variant="secondary" className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4 " /></Button>
                            <AlertDialog.Backdrop>
                              <AlertDialog.Container>
                                <AlertDialog.Dialog className="sm:max-w-[400px]">
                                  <AlertDialog.CloseTrigger />
                                  <AlertDialog.Header>
                                    <AlertDialog.Icon status="danger" />
                                    <AlertDialog.Heading>Delete course permanently?</AlertDialog.Heading>
                                  </AlertDialog.Header>
                                  <AlertDialog.Body>
                                    <p>
                                      This will permanently delete <strong>{course.title}</strong> and all of its
                                      data. This action cannot be undone.
                                    </p>
                                  </AlertDialog.Body>
                                  <AlertDialog.Footer>
                                    <Button slot="close" variant="tertiary">
                                      Cancel
                                    </Button>
                                    <Button onClick={() => { deleteMutation.mutate(course._id); }} slot="close" variant="danger">
                                      Delete Course
                                    </Button>
                                  </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                              </AlertDialog.Container>
                            </AlertDialog.Backdrop>
                          </AlertDialog>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {courses.map((course) => (
                <div key={course._id} className="card p-4">
                  <div className="flex gap-3 mb-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <img src={course.courseImage} alt={course.title} className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm line-clamp-2">{course.title}</h3>
                      <p className="text-xs text-neutral-500">{course.category} · ${course.price}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/courses/${course._id}`} className="btn-outline rounded-full flex-1 text-sm "><Eye className="w-4 h-4" /> View</Link>
                    <AlertDialog>
                      <Button variant="secondary" className="  text-red-500 flex-1 text-sm py-4"><Trash2 className="w-4 h-4 text-red-600" /> Delete</Button>
                      <AlertDialog.Backdrop>
                        <AlertDialog.Container>
                          <AlertDialog.Dialog className="sm:max-w-[400px]">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                              <AlertDialog.Icon status="danger" />
                              <AlertDialog.Heading>Delete course permanently?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                              <p>
                                This will permanently delete <strong>{course.title}</strong> and all of its
                                data. This action cannot be undone.
                              </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                              <Button slot="close" variant="tertiary">
                                Cancel
                              </Button>
                              <Button onClick={() => { deleteMutation.mutate(course._id); }} slot="close" variant="danger">
                                Delete Course
                              </Button>
                            </AlertDialog.Footer>
                          </AlertDialog.Dialog>
                        </AlertDialog.Container>
                      </AlertDialog.Backdrop>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ManageCoursesPage() {
  return <ProtectedRoute><ManageCourses /></ProtectedRoute>;
}
