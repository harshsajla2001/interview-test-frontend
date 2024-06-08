"use client";
import React, { useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { useGlobleContext } from "../gobleContext";
function SideNavbar() {
  const { setTeamLeaderProfile,teamLeaderProfile} = useGlobleContext();

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: "icon",
    },
    {
      name: "Team Members",
      href: teamLeaderProfile ? "/team-members" : "/",
      icon: "icon",
    },
    {
      name: "Assets",
      href: "/",
      icon: "icon",
    },
    {
      name: "Projects",
      href: "/",
      icon: "icon",
    },
    {
      name: "Tasks",
      href: "/",
      icon: "icon",
    },
    {
      name: "Attendance",
      href: "/",
      icon: "icon",
    },
    {
      name: "Timesheet",
      href: "/",
      icon: "icon",
    }
  ]

  return (
    <div className='w-60 shadow-2xl	h-screen'>
      <div className=" flex items-center justify-center py-12 font-bold text-2xl cursor-pointer" >
        Cyber Tech
      </div>
      <div className='flex  w-full'>

      
      <NavigationMenu className="">
        <NavigationMenuList className=" "> 
            <div className=' flex w-full flex-col gap-1'>
            {
              navItems.map((item, i) => (
                <NavigationMenuItem key={i} className="">
                  <Link
                    className="font-bold text-xl flex h-full w-full select-none flex-col justify-end rounded-lg from-muted/50 to-muted py-4 px-5 no-underline outline-none focus:shadow-md focus:bg-slate-200"
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuItem>
              ))
            }
          </div >
        </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )


}

export default SideNavbar