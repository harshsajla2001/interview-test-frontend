"use client";
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Checkbox, Link } from "@nextui-org/react";
import axios from "axios";
import { useGlobleContext } from "@/gobleContext/index.jsx";
import Header from '@/components/Header';
import SideNavbar from '@/components/SideNavbar'
import MemberCard from '@/components/Card';
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
function AddFormModal({ setLoadToggle, loadToggle }) {

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
            <Button onPress={onOpen} color="primary">Add New Team Member</Button>

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


function TeamMemberPage() {
    const { teamLeaderProfile, setTeamLeaderProfile } = useGlobleContext();
    const [teamMembers, setTeamMembers] = useState([]);
    const [loadToggle, setLoadToggle] = useState(false);
    const [value, setValue] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });
    useEffect(() => {
        const fetchTeamMembers = async () => {
            const accessToken = localStorage.getItem("accessToken");
            const teamLeaderId = localStorage.getItem("teamLeaderId");
            try {
                const teamMembersResponse = await axios.post('http://localhost:8000/api/v1/team-leader/get-team-member',
                    { id: teamLeaderId },
                    {
                        headers: {
                            'authorization': `Bearer ${accessToken}`
                        }
                    });

                setTeamMembers(teamMembersResponse.data.data.teamMembers);

            } catch (error) {
                console.log(error)
            }
        };
        fetchTeamMembers();
    }, [loadToggle])
    return (
        <div className='min-h-screen flex'>
            <div>
                <SideNavbar />
            </div>
            <div className="flex flex-col  w-full">
                <div className="">
                    <Header />
                </div>

                <div className="flex flex-col  px-14 py-8 space-x-8 w-full">
                    <div className='flex  items-center justify-between px-8'>
                        <div className="font-semibold">
                            Total Team Members: {teamMembers.length}

                        </div>
                        <AddFormModal
                            setLoadToggle={setLoadToggle}
                            loadToggle={loadToggle}
                        />

                    </div>
                    <div className='flex flex-wrap justify-space-between px-14 py-8 gap-8 w-full'>
                        {
                            teamMembers.map((member) => {
                                return (
                                    <MemberCard key={member._id} member={member} setLoadToggle={setLoadToggle}
                                        loadToggle={loadToggle} />
                                )
                            })
                        }
                    </div>

                </div>

            </div>

        </div>
    )
}

export default TeamMemberPage