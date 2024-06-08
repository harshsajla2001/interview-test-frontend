"use client";
import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, User } from "@nextui-org/react";
import ModalForm from './modal/App';
import { useGlobleContext } from '@/gobleContext';
import { redirect } from 'next/dist/server/api-utils';


function Header() {
  const { teamLeaderProfile, setTeamLeaderProfile } = useGlobleContext();
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setAccessToken(accessToken);
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("teamLeaderId");
    setTeamLeaderProfile(null);
    redirect('/')
  };
  return (
    <div className='h-32 flex justify-between shadow-lg'>
      <div className=" flex items-center px-14 font-bold text-2xl">
        Team Members
      </div>
      <div className="flex items-center gap-4 px-10">
        {
          accessToken ? (
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  }}
                  className="transition-transform"
                  description="@tonyreichert"
                  name="Tony Reichert"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="bordered">
                <DropdownItem key="settings">
                  My Settings
                </DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>

                <DropdownItem key="logout" className="text-danger" color="danger" onClick={handleLogout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <ModalForm />
          )
        }
        
        
      </div>
    </div>
  )
}

export default Header