"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Heading from "@/app/utils/Heading";
import AdminProfile from "@/app/components/admin/AdminProfile";
import WebContentEditor from "@/app/components/admin/Web-Content";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { axiosInstance } from "@/app/lib/axios";
import { Props, setContent } from "@/app/store/web-content";
import { toast } from "react-hot-toast";

export default function Page() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { content } = useAppSelector((state) => state.webContent);
  const [uploadingContent, setUploadingContent] = useState(false);

  const handleSave = async (updatedContent: Props) => {
    console.log("Saving Content:", updatedContent);
    const filteredUpdatedContent = {
      tagline: updatedContent.tagline,
      subTagline: updatedContent.subTagline,
      facebook: updatedContent.facebook,
      twitter: updatedContent.twitter,
      instagram: updatedContent.instagram,
      linkedin: updatedContent.linkedin,
      heroImage:
        updatedContent.heroImage === content?.heroImage
          ? ""
          : updatedContent.heroImage,
      aboutImage:
        updatedContent.aboutImage === content?.aboutImage
          ? ""
          : updatedContent.aboutImage,
      logo: updatedContent.logo === content?.logo ? "" : updatedContent.logo,
    };
    try {
      setUploadingContent(true);
      const res = await axiosInstance.put(
        `/admin/${content?._id}`,
        filteredUpdatedContent
      );
      console.log("Updated Content:", res.data);
      dispatch(setContent(res.data));
      setUploadingContent(false);
      toast.success("Content updated successfully");
    } catch (error) {
      console.log(error);
      setUploadingContent(false);
    }
  };

  // fetch the content

  useEffect(() => {
    const getWebContent = async () => {
      try {
        console.log("Fetching content from /admin");
        const res = await axiosInstance.get("/admin");
        dispatch(setContent(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    getWebContent();
  }, [dispatch]);

  return (
    <div className="w-full h-screen text-black dark:text-white p-4 sm:p-8">
      <Heading
        title="Settings | Admin"
        description="Manage admin profile, update web content, and control platform settings for Codemy — the coding learning platform. Optimize your content, keep your brand updated, and ensure the best student experience."
        keywords="admin settings, profile management, web content, coding platform admin, Codemy admin dashboard, manage courses, student platform settings"
      />
      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Content */}
      <div className=" w-full h-[90vh] overflow-y-auto py-6 hide-scrollbar">
        {activeTab === "Profile" ? (
          <AdminProfile />
        ) : activeTab === "Web Content" ? (
          <WebContentEditor
            initialContent={content || ({} as Props)}
            onSave={handleSave}
            uploadingContent={uploadingContent}
          />
        ) : (
          <div>Courses Content</div>
        )}
      </div>
    </div>
  );
}

type tabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = ["Profile", "Web Content", "Courses"];

const Tabs = ({ activeTab, setActiveTab }: tabsProps) => {
  return (
    <div className="w-full flex items-center gap-6">
      {tabs.map((tab) => (
        <div
          key={tab}
          className="relative cursor-pointer pb-2"
          onClick={() => setActiveTab(tab)}
        >
          <p className={`${activeTab === tab ? "text-blue-500" : ""}`}>{tab}</p>
          {activeTab === tab && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
            />
          )}
        </div>
      ))}
    </div>
  );
};
