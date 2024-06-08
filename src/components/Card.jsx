"use client";
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Checkbox, Link } from "@nextui-org/react";
import axios from "axios";
import { useGlobleContext } from "@/gobleContext/index.jsx";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { EllipsisVertical } from 'lucide-react';

function EditFormModal({ setLoadToggle, loadToggle }) {

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("teamLeaderId");
    try {
      const response = await axios.post('http://localhost:8000/api/v1/team-member/register', {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        teamLeaderId: id
      })
      setValues({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      })
      setLoadToggle(!loadToggle)
    } catch (error) {

    }

  }
  return (
    <>
      <Button onPress={onOpen} color="primary">Edit Team Member</Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col space-y-8 space-x-10">Add New Team Member</ModalHeader>

              <ModalBody className="flex flex-col space-y-8 space-x-10">
                <form onSubmit={handleSubmit}>
                  <>
                    <Input
                      autoFocus
                      label="Name"
                      name="name"
                      placeholder="Enter your name"
                      variant="bordered"
                      value={values.name}
                      onChange={onChange}
                    />
                    <Input
                      label="Email"
                      name="email"
                      placeholder="Enter your email"
                      variant="bordered"
                      value={values.email}
                      onChange={onChange}
                    />
                    <Input
                      label="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      variant="bordered"
                      value={values.phone}
                      onChange={onChange}
                    />
                    <Input
                      label="Password"
                      name="password"
                      variant="bordered"
                      placeholder="Enter your password"
                      value={values.password}
                      endContent={<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>}
                      type={isVisible ? "text" : "password"}
                      className=""
                      onChange={onChange}
                    />
                    <Input
                      label="Confirm Password"
                      name="confirmPassword"
                      variant="bordered"
                      placeholder="Confirm your password"
                      value={values.confirmPassword}
                      onChange={onChange}
                      endContent={<button className="focus:outline-none" type="button" onClick={toggleVisibility2}>
                        {isVisible2 ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>}
                      type={isVisible2 ? "text" : "password"}
                      className=""
                    />
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={onClose} type="submit">
                        Add
                      </Button>
                    </ModalFooter>
                  </>

                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
function MemberCard({ member, setLoadToggle, loadToggle }) {

  const handleDelete = async (teamMemberId, teamLeaderId) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await axios.delete('http://localhost:8000/api/v1/team-member/delete', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        data: {
          teamMemberId: teamMemberId,
          teamLeaderId: teamLeaderId
        }
      });
      setLoadToggle(!loadToggle)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (id, key, newValue) => {
    const accessToken = localStorage.getItem("accessToken");
    const newValues = {
      key: value
    }
    try {
      const res = await axios.patch(`http://localhost:8000/api/v1/team-member/update/${id}`,
        newValues,
        {
          headers: {
            'authorization': `Bearer ${accessToken}`
          }
        })
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div>
      <Card>
        <CardHeader>
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 mx-6">
            <CardTitle>{member?.name}</CardTitle>
            <CardDescription>{member?.email}</CardDescription>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleDelete(member?._id, member?.teamLeaderId)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="flex gap-2">
          <div>
            <p>05</p>
            <p>Projects</p>
          </div>
          <div>
            <p>08</p>
            <p>Tasks</p>
          </div>
          <div>
            <p>55</p>
            <p>Assets</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MemberCard