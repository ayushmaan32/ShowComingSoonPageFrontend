// src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

interface BannerData {
  is_visible: boolean;
  description: string;
  timer: string;
  link: string;
}

const Dashboard: React.FC = () => {
  const [bannerData, setBannerData] = useState<BannerData>({
    is_visible: true,
    description: "",
    timer: "",
    link: "",
  });
  console.log(bannerData);

  useEffect(() => {
    // Fetch current banner data from the API
    // fetch("/api/banner")
    //   .then((res) => res.json())
    //   .then((data) => setBannerData(data))
    //   .catch((err) => console.error("Error fetching banner data:", err));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "timer" && Number(value) < 0 && isNaN(Number(value))) {
      return;
    }
    setBannerData({
      ...bannerData,
      [name]: value,
    });
  };

  const handleToggleChange = () => {
    setBannerData({
      ...bannerData,
      is_visible: !bannerData.is_visible,
    });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:8000/update_banner", bannerData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.error("Error updating banner:", err);
      });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded shadow-md my-5">
      <h1 className="text-2xl font-bold mb-4">Banner Settings</h1>

      <label className="block mb-4">
        <span className="text-gray-700">Banner Visibility:</span>
        <input
          type="checkbox"
          checked={bannerData.is_visible}
          onChange={handleToggleChange}
          className="ml-2"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Banner Description:</span>
        <textarea
          name="description"
          value={bannerData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  focus:outline-slate-400"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Banner Timer (days):</span>
        <input
          type="date"
          name="timer"
          value={bannerData.timer}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  focus:outline-slate-400"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Banner Link:</span>
        <input
          type="url"
          name="link"
          value={bannerData.link}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-slate-400"
        />
      </label>

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded shadow-md hover:bg-indigo-700"
      >
        Save Banner
      </button>
    </div>
  );
};

export default Dashboard;
