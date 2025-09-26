"use client";

import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import { axiosInstance } from "@/app/lib/axios";
import { Props} from "@/app/store/web-content";


type EditorProps = {
  initialContent: Props;
  onSave: (content: Props) => void;
  uploadingContent: boolean;
};

const WebContentEditor = ({ initialContent, onSave ,uploadingContent}: EditorProps) => {
  const [content, setContent] = useState<Props>({
    logo: initialContent?.logo || "",
    tagline: initialContent?.tagline || "",
    heroImage: initialContent?.heroImage || "",
    aboutImage: initialContent?.aboutImage || "",
    subTagline: initialContent?.subTagline || "",
    supportEmail: initialContent?.supportEmail || "",
    phoneNo: initialContent?.phoneNo || "",
    address: initialContent?.address || "",
    facebook: initialContent?.facebook || "",
    twitter: initialContent?.twitter || "",
    instagram: initialContent?.instagram || "",
    linkedin: initialContent?.linkedin || "",
    _id: initialContent?._id || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value } as Props);
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logo" | "heroImage" | "aboutImage"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () =>
        setContent({ ...content, [field]: reader.result as string } as Props);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => onSave(content);

  const socialFields = ["facebook", "twitter", "instagram", "linkedin"] as const;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axiosInstance.get("/admin");
        setContent(res.data);
      } catch (error) {
        console.error("Failed to fetch content:", error);
      }
    };
    if (!initialContent) fetchContent();
  }, [initialContent]);

  return (
    <div className="w-full max-w-6xl mx-auto p-2 sm:p-6 py-8 sm:py-4 rounded-xl shadow-lg flex flex-col gap-8">
      {/* Logo and Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ImageUpload
          label="Logo"
          image={content.logo}
          onChange={(e) => handleImageChange(e, "logo")}
        />
        <ImageUpload
          label="Hero Image"
          image={content.heroImage}
          onChange={(e) => handleImageChange(e, "heroImage")}
        />
        <ImageUpload
          label="About Image"
          image={content.aboutImage}
          onChange={(e) => handleImageChange(e, "aboutImage")}
        />
      </div>

      {/* Text Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Tagline" name="tagline" value={content.tagline} onChange={handleChange} />
        <InputField label="Sub Tagline" name="subTagline" value={content.subTagline} onChange={handleChange} />
        <InputField label="Phone Number" name="phoneNo" value={content.phoneNo} onChange={handleChange} />
        <InputField label="Address" name="address" value={content.address} onChange={handleChange} />
        <InputField label="Support Email" name="supportEmail" type="email" value={content.supportEmail} onChange={handleChange} />
      </div>

      {/* Social Links */}
      <div>
        <h2 className="text-lg font-semibold sm:text-xl py-4">Social Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {socialFields.map((field) => (
          <InputField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            value={content[field]}
            onChange={handleChange}
          />
        ))}
      </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="w-full md:w-1/3 py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg hover:bg-purple-700 active:scale-95 transition transform duration-300 cursor-pointer"
        >
            {uploadingContent ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

// Reusable Input Field
type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const InputField = ({ label, name, value, type = "text", onChange }: InputFieldProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-gray-700 dark:text-gray-300 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition"
    />
  </div>
);

// Reusable Image Upload
type ImageUploadProps = {
  label: string;
  image: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpload = ({ label, image, onChange }: ImageUploadProps) => (
  <div className="flex flex-col gap-2">
    <label className="font-semibold text-purple-700 dark:text-purple-400">{label} (Preview)</label>
    <div className="relative w-full h-48 md:h-60 rounded-lg border-2 border-gray-300 dark:border-gray-700 overflow-hidden group hover:shadow-lg transition">
      {image ? (
        <Image src={image} alt={label} fill unoptimized className="object-contain" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500">
          <Camera size={32} />
        </div>
      )}
      <input type="file" accept="image/*" onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
    </div>
  </div>
);

export default WebContentEditor;
