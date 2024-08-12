import React, { useEffect, useState } from "react";
import Countdown from "../CountDown/CountDown";
import axios from "axios";
import { data } from "../../types/types";
import bannerimg from "../../bannerimg.png";
type HomeBannerProps = {
  loading: boolean;
  timeLeft: number;
  data: data;
};

const HomeBanner: React.FC<HomeBannerProps> = ({ loading, data, timeLeft }) => {
  // const { loading, data } = useGetHomeData();
  // const currentDate = new Date();
  const launchDate = new Date(data.timer);
  console.log(launchDate);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-900 via-indigo-600 to-blue-500 text-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 flex justify-center items-center opacity-40">
        <div className="bg-[url('https://source.unsplash.com/random')] bg-cover bg-center w-[80vw] h-[80vh] blur-3xl opacity-20 rounded-full"></div>
      </div>

      <a
        href={data.link}
        target="_blank"
        // rel="noopener noreferrer"
        className="mb-3 w-9/12 h-full "
      >
        <img
          src={bannerimg}
          alt="Promotional Banner"
          className="w-full h-32 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
        />
      </a>

      {/* Main Content */}
      <h1 className="text-6xl md:text-8xl font-extrabold mb-12 text-center drop-shadow-lg">
        {/* Our Project Launches Soon! */}
        {!loading && data && data.description}
      </h1>
      <Countdown targetDate={launchDate} />
      <p className="mt-12 text-2xl md:text-3xl font-medium">
        Stay tuned for more updates.
      </p>

      {/* Call to Action */}
      <button className="mt-10  mb-3 cursor-pointer px-8 py-4 bg-white text-indigo-600 rounded-full text-xl font-semibold hover:bg-indigo-400 transition duration-300 shadow-lg">
        Notify Me
      </button>

      {/* Animated Background Elements */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 mb-4">
        <div className="w-8 h-8 bg-indigo-400 rounded-full animate-bounce"></div>
        <div className="w-6 h-6 bg-purple-400 rounded-full animate-ping"></div>
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};
export default HomeBanner;

function useGetHomeData() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState({ description: "", timer: 0, link: "" });

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const response = await axios.get("http://localhost:8000");
      const data = await response.data;
      console.log(data);
      setData(data);
      setLoading(false);
    };
    getData();
  }, []);
  return { loading, data };
}
