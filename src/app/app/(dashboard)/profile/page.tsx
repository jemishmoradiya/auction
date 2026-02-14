"use client";

import { useProfileData } from "./hooks/useProfileData";
import { ProfileView } from "./components/ProfileView";

export default function ProfilePage() {
    const profileData = useProfileData();

    return <ProfileView {...profileData} />;
}
