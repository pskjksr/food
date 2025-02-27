"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Profile() {
  const DEFAULT_IMAGE = "/uploads/default-avatar.jpg";
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState<string | null>("Loading...");
  const [email, setEmail] = useState<string | null>("Loading...");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(DEFAULT_IMAGE);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle authentication state before rendering anything else
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login');  // Redirect to login if unauthenticated
    }
  }, [status, router]);

  // Skip rendering if still loading or unauthenticated
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Fetch user data once session is available
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!session?.user?.id) {
          setError("Authentication required. Please login.");
          return;
        }

        const res = await fetch(`/api/user/${session.user.id}`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await res.json();
        setName(data.name || "No name available");
        setEmail(data.email || "No email available");
        setProfileImage(data.profileImage || DEFAULT_IMAGE);
      } catch (err) {
        setError("Error fetching user data. Please try again.");
        console.error(err);
      }
    };

    if (session?.user?.id) {
      fetchUser();
    }
  }, [session]);

  // Save updated profile
  const handleSave = async () => {
    try {
      if (!session?.user?.id) {
        setError("Authentication required. Please login.");
        return;
      }

      const res = await fetch(`/api/user/${session.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({ name, profileImage }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update profile.");
      }

      const data = await res.json();
      setName(data.name || "No name available");
      setProfileImage(data.profileImage || DEFAULT_IMAGE);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to save changes. Please try again.");
      console.error("Error updating profile:", err);
    }
  };

  // Handle image upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      setIsUploading(true);
      setError(null);

      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          throw new Error(uploadData.error || "Image upload failed.");
        }

        const newImageUrl = uploadData.imageUrl;

        if (!session?.user?.id) {
          setError("Authentication required. Please login.");
          return;
        }

        const updateRes = await fetch(`/api/user/${session.user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify({ profileImage: newImageUrl }),
        });

        const updateData = await updateRes.json();

        if (!updateRes.ok) {
          throw new Error(updateData.error || "Failed to update profile image.");
        }

        setProfileImage(newImageUrl);
      } catch (err) {
        setError("Error uploading image. Please try again.");
        console.error("Error:", err);
        setProfileImage(DEFAULT_IMAGE); // Reset to default if upload fails
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto font-sans">
      <h2 className="text-2xl mb-6 text-gray-800 flex items-center">
        <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full mr-2"></span> Profile
      </h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="flex flex-row items-start rounded-lg">
        <div className="relative mr-12">
          {isUploading ? (
            <p>Uploading...</p>
          ) : (
            <Image
              src={profileImage}
              alt="Profile"
              width={288}
              height={240}
              className="rounded-lg object-cover shadow-sm"
            />
          )}
          <label
            htmlFor="image-upload"
            className="absolute top-2 left-2 bg-black text-white rounded-full p-2 cursor-pointer w-10 h-10 flex items-center justify-center"
          >
            📷
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div>
          <p className="mb-2 text-gray-700">
            <strong>Name:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                className="border p-1 ml-2"
              />
            ) : (
              <span className="block text-gray-500">{name || "Loading..."}</span>
            )}
          </p>
          <p className="mb-4 text-gray-700">
            <strong>Email:</strong> <span className="text-gray-500">{email || "Loading..."}</span>
          </p>

          {isEditing ? (
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-1 rounded-md">
              Save
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="bg-gray-300 px-3 py-1 rounded-md">
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <Link href="/Like" className="bg-green-500 text-white px-4 py-2 rounded-md">
          My Likes
        </Link>
      </div>
    </div>
  );
}
