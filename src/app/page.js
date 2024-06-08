"use client";
import Header from "@/components/Header";
import SideNavbar from "../components/SideNavbar";
import { useGlobleContext } from "@/gobleContext";
import { useEffect } from "react";
import axios from "axios";


export default function Home() {
  const { teamLeaderProfile, setTeamLeaderProfile } = useGlobleContext();
  useEffect(() => {
    const fetchTeamleaderProfile = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const profileResponse = await axios.get('http://localhost:8000/api/v1/team-leader/profile', {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });

        setTeamLeaderProfile(profileResponse.data.data);
        localStorage.setItem("teamLeaderId", profileResponse.data.data._id);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTeamleaderProfile();
  }, []);

  return (
    <main className=" min-h-screen flex">
      <div>
        <SideNavbar />
      </div>
      <div className="flex flex-col  w-full">
        <div className="">
          <Header />
        </div>
        <div className="font-extrabold text-2xl flex justify-center mt-48 cursor-pointer" >
          Login for Team Leader page
        </div>
      </div>
    </main>
  );
}
