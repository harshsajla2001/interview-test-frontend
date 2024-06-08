"use client";
import { createContext, useContext, useState } from "react"

const GlobleContext = createContext();

export function ContextWapper({ children }) {
    const [teamLeaderProfile, setTeamLeaderProfile] = useState(null);

    return (
        <GlobleContext.Provider value={{
            teamLeaderProfile,
            setTeamLeaderProfile
        }}>
            {children}
        </GlobleContext.Provider>
    )
}

export function useGlobleContext() {
    return useContext(GlobleContext);
}
