"use client";
import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Checkbox, Link } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../EyeSlashFilledIcon.jsx";
import { EyeFilledIcon } from "../EyeFilledIcon.jsx";
import axios from "axios";
import { useGlobleContext } from "@/gobleContext/index.jsx";

export default function ModalForm() {
    const { teamLeaderProfile, setTeamLeaderProfile } = useGlobleContext();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formType, setFormType] = useState('register');
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [loginValues, setLoginValues] = useState({
        email: '',
        password: ''
    })
    const [registerValues, setRegisterValues] = useState({
        name: '',
        email: '',
        department: '',
        password: '',
        confirmPassword: ''
    });

    const onChange = (e) => {
        if (formType === 'register') {
            setRegisterValues({
                ...registerValues,
                [e.target.name]: e.target.value
            })
        } else {
            setLoginValues({
                ...loginValues,
                [e.target.name]: e.target.value
            })
        }

    };

    useEffect(() => {
        console.log(formType === 'register' ? registerValues : loginValues);
    }, [registerValues, loginValues, formType]);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibility2 = () => setIsVisible2(!isVisible2);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const registerData = {
            name: registerValues.name,
            email: registerValues.email,
            department: registerValues.department,
            password: registerValues.password
        };

        if (formType === 'register') {
            const registerResponse = await axios.post('http://localhost:8000/api/v1/team-leader/register', registerData);
            if (registerResponse.data.success) {
                try {
                    const loginResponse = await axios.post('http://localhost:8000/api/v1/team-leader/login', {
                        email: registerValues.email,
                        password: registerValues.password
                    })
                    localStorage.setItem("accessToken", loginResponse.data.accessToken);
                    const profileResponse = await axios.get('http://localhost:8000/api/v1/team-leader/profile', {
                        headers: {
                            'authorization': `Bearer ${loginResponse.data.accessToken}`
                        }
                    });
                    setTeamLeaderProfile(profileResponse.data.data);
                    localStorage.setItem("teamLeaderId", profileResponse.data.data._id);
                } catch (error) {
                    throw new Error(error);
                }
            }
        } else {
            try {
                const loginResponse = await axios.post('http://localhost:8000/api/v1/team-leader/login', {
                    email: loginValues.email,
                    password: loginValues.password
                })
                localStorage.setItem("accessToken", loginResponse.data.accessToken);
                const profileResponse = await axios.get('http://localhost:8000/api/v1/team-leader/profile', {
                    headers: {
                        'authorization': `Bearer ${loginResponse.data.accessToken}`
                    }
                });
                setTeamLeaderProfile(profileResponse.data.data);
                localStorage.setItem("teamLeaderProfile", profileResponse.data.data);


            } catch (error) {
                throw new Error(error);
            }

        }
    };

    return (
        <>
            <Button onPress={onOpen} color="primary">Login/Signup</Button>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col space-y-8 space-x-10">Sign Up</ModalHeader>

                            <ModalBody className="flex flex-col space-y-8 space-x-10">
                                <form onSubmit={handleSubmit}>
                                    {formType === 'register' ? (
                                        <>
                                            <Input
                                                autoFocus
                                                label="Name"
                                                name="name"
                                                placeholder="Enter your name"
                                                variant="bordered"
                                                value={registerValues.name}
                                                onChange={onChange} /><Input
                                                label="Email"
                                                name="email"
                                                placeholder="Enter your email"
                                                variant="bordered"
                                                value={registerValues.email}
                                                onChange={onChange} /><Input
                                                label="Department"
                                                name="department"
                                                placeholder="Enter your department"
                                                variant="bordered"
                                                value={registerValues.department}
                                                onChange={onChange} /><Input
                                                label="Password"
                                                name="password"
                                                variant="bordered"
                                                placeholder="Enter your password"
                                                value={registerValues.password}
                                                onChange={onChange}
                                                endContent={<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                    {isVisible ? (
                                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    ) : (
                                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    )}
                                                </button>}
                                                type={isVisible ? "text" : "password"}
                                                className="" /><Input
                                                label="Confirm Password"
                                                name="confirmPassword"
                                                variant="bordered"
                                                placeholder="Confirm your password"
                                                value={registerValues.confirmPassword}
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
                                            <Button color="primary" variant="light" size="sm" onClick={() => setFormType('login')}>
                                                Already have an account?
                                            </Button>
                                            <ModalFooter>
                                                <Button color="danger" variant="flat" onPress={onClose}>
                                                    Close
                                                </Button>
                                                <Button color="primary" onPress={onClose} type="submit">
                                                    Lets Go
                                                </Button>
                                            </ModalFooter>
                                        </>


                                    ) : (
                                        <>
                                            <Input
                                                autoFocus
                                                name="email"
                                                label="Email"
                                                value={loginValues.email}
                                                placeholder="Enter your email"
                                                variant="bordered"
                                                onChange={onChange}
                                            />

                                            <Input
                                                endContent={
                                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility2}>
                                                        {isVisible2 ? (
                                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                        ) : (
                                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                        )}
                                                    </button>
                                                }
                                                type={isVisible2 ? "text" : "password"}
                                                label="Password"
                                                placeholder="Enter your password"
                                                variant="bordered"
                                                name="password"
                                                value={loginValues.password}
                                                onChange={onChange}
                                            />
                                            <Button color="primary" variant="light" size="sm" onClick={() => setFormType('register')}>
                                                Dont have an account?
                                            </Button>
                                            <ModalFooter>
                                                <Button color="danger" variant="flat" onPress={onClose}>
                                                    Close
                                                </Button>
                                                <Button color="primary" onPress={onClose} type="submit">
                                                    Lets Go
                                                </Button>
                                            </ModalFooter>
                                        </>
                                    )
                                    }
                                </form>

                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}