"use client";

import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState, useRef } from "react";
import { FaUser, FaCamera, FaSave, FaTimes, FaImage } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
interface EditProfileModalProps {
    currentName: string;
    currentImage: string;
    currentCover: string;
}

export function EditProfileModal({ currentName, currentImage, currentCover }: EditProfileModalProps) {
    const { data: session } = authClient.useSession();
    const router = useRouter();
    const [name, setName] = useState(currentName);

    const [imagePreview, setImagePreview] = useState(currentImage);
    const [coverPreview, setCoverPreview] = useState(currentCover);

    const [isUploading, setIsUploading] = useState(false);

    const imageInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);


    const uploadToImgBB = async (file: File): Promise<string | null> => {
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image Size Should be less than 5 MB');
            return null;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            if (!IMGBB_API_KEY) {
                toast.error("Image upload API key is missing in environment variables.");
                return null;
            }

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            return data?.data?.url || null;
        } catch (err) {
            toast.error('Image upload failed');
            return null;
        }
    };

    const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const uploadedUrl = await uploadToImgBB(file);
        if (uploadedUrl) {
            setImagePreview(uploadedUrl);
            console.log(uploadedUrl);

        }
        setIsUploading(false);
    };

    const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const uploadedUrl = await uploadToImgBB(file);
        if (uploadedUrl) {
            setCoverPreview(uploadedUrl);
            console.log(uploadedUrl);

        }
        setIsUploading(false);
    };

    const handleSubmit = async (e: React.FormEvent, close: () => void) => {
        e.preventDefault();


        await authClient.updateUser(
            {
                name: name.trim(),
                image: imagePreview,
                coverImage: coverPreview,
            } as Parameters<typeof authClient.updateUser>[0] & { coverImage: string },
            {
                onRequest: () => {
                    // loading state
                },
                onSuccess: () => {
                    toast.success("Profile update Successful!");
                    router.refresh();
                    close();
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || 'Something went wrong during update');
                },
            }
        );
    };

    return (
        <Modal>
       
            <Button variant="secondary" className="rounded-full gap-2">
                Edit Profile
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-lg">
                        {({ close }) => (
                            <>
                                <Modal.CloseTrigger />

                                <Modal.Header>
                                    <Modal.Icon className="bg-blue-500/10 text-blue-500">
                                        <FaUser className="size-5" />
                                    </Modal.Icon>
                                    <Modal.Heading className='text-black dark:text-white ' >Edit Profile</Modal.Heading>
                                    <p className="mt-1.5 text-sm leading-5 text-slate-500 dark:text-slate-400">
                                        Modify your name, avatar and cover banner. Images will be automatically uploaded to Cloud.
                                    </p>
                                </Modal.Header>

                                <Modal.Body className="p-6">
                                    <Surface variant="default" className="bg-transparent border-0 shadow-none">
                                        <form onSubmit={(e) => handleSubmit(e, close)} className="flex flex-col gap-6">

                                            <div className="relative mb-14">
                                                <div
                                                    onClick={() => !isUploading && coverInputRef.current?.click()}
                                                    className={`w-full h-36 rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden relative group cursor-pointer border border-slate-200 dark:border-slate-700 ${isUploading ? 'opacity-50 cursor-wait' : ''}`}
                                                >
                                                    {coverPreview ? (
                                                        <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                                            <FaImage className="w-6 h-6 mb-1" />
                                                            <span className="text-xs">Upload Cover</span>
                                                        </div>
                                                    )}
                                                    {!isUploading && (
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white text-xs font-semibold">
                                                            <FaCamera /> Change Cover
                                                        </div>
                                                    )}
                                                </div>

                                                <input
                                                    type="file"
                                                    ref={coverInputRef}
                                                    onChange={handleCoverImageUpload}
                                                    accept="image/*"
                                                    className="hidden"
                                                    disabled={isUploading}
                                                />

                                                <div className="absolute left-6 -bottom-12">
                                                    <div
                                                        onClick={() => !isUploading && imageInputRef.current?.click()}
                                                        className={`relative w-24 h-24 rounded-full border-4 border-white dark:border-slate-950 shadow-lg overflow-hidden cursor-pointer group bg-slate-100 ${isUploading ? 'opacity-50 cursor-wait' : ''}`}
                                                    >
                                                        <img src={imagePreview} alt="Avatar" className="w-full h-full object-cover" />
                                                        {!isUploading && (
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white">
                                                                <FaCamera className="w-4 h-4" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <input
                                                    type="file"
                                                    ref={imageInputRef}
                                                    onChange={handleProfileImageUpload}
                                                    accept="image/*"
                                                    className="hidden"
                                                    disabled={isUploading}
                                                />
                                            </div>

                                            <TextField
                                                isRequired
                                                className="w-full"
                                                name="name"
                                                type="text"
                                                variant="secondary"
                                                value={name}
                                                onChange={(val) => setName(val)}
                                            >
                                                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</Label>
                                                <Input
                                                    placeholder="Enter your name"
                                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                                                />
                                            </TextField>

                                        
                                            <div className="flex justify-end gap-3 pt-2">
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    onClick={close}
                                                    className="rounded-full gap-1.5"
                                                    isDisabled={isUploading}
                                                >
                                                    <FaTimes className="w-3.5 h-3.5" />
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    className="rounded-full gap-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
                                                    isDisabled={isUploading}
                                                >
                                                    {isUploading ? "Uploading..." : (
                                                        <>
                                                            <FaSave className="w-3.5 h-3.5" />
                                                            Save Changes
                                                        </>
                                                    )}
                                                </Button>
                                            </div>

                                        </form>
                                    </Surface>
                                </Modal.Body>
                            </>
                        )}
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}