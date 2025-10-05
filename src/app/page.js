"use client";
import "./globals.css";
import EarthScene from "./Components/Mainpage/EarthScene";
import LeftSideinfo from "./Components/Mainpage/LeftSideinfo";
import Navbar from "./Components/Navbar";
export default function Home() {
  return (
      <div className="MainPage">
        <Navbar/>
        <LeftSideinfo/>
        <EarthScene className={"RightSideInfo"} />
      </div>
  );
}
