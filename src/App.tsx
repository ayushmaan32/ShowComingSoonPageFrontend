import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import HomeBanner from "./Component/HomeBanner/HomeBanner";
import Dashboard from "./pages/Dashboard/Dashboard";
import axios from "axios";
import { data } from "./types/types";

function App() {
  const { loading, data, timeLeft, showBanner } = useGetHomeData();

  return (
    <div>
      {/* <HomeBanner /> */}
      <Routes>
        <Route
          path="/"
          element={
            showBanner ? (
              <HomeBanner loading={loading} data={data} timeLeft={timeLeft} />
            ) : (
              <div>Main Page</div>
            )
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;

function useGetHomeData() {
  const [showBanner, setShowBanner] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<data>({
    description: "",
    timer: "",
    link: "",
    is_visible: false,
  });
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const response = await axios.get("http://localhost:8000");
      const data = await response.data;
      console.log(data);
      setData(data);
      setTimeLeft(data.timer);
      setShowBanner(data.is_visible);
      setLoading(false);
    };
    getData();
  }, []);
  return { loading, data, timeLeft, showBanner };
}
