"use client";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import Mentee from "@/components/applications/Mentee";
import Mentor from "@/components/applications/Mentor";

const Applications = () => {
  const { user } = useAuth();

  return <>{user.role === "Mentee" ? <Mentee /> : <Mentor />}</>;
};

export default Applications;
