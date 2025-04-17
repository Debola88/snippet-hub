"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { AudioWaveform, Command, Settings2 } from "lucide-react";
import { BsTrash } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoLogoJavascript } from "react-icons/io5";
import { SiCplusplus } from "react-icons/si";
import { AiOutlinePython } from "react-icons/ai";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { NavMain } from "@/components/layout/dashboard/sidebar/nav-main";
import { NavProjects } from "@/components/layout/dashboard/sidebar/nav-projects";
import { NavUser } from "@/components/layout/dashboard/sidebar/nav-user";
import { TeamSwitcher } from "@/components/layout/dashboard/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { APP_LINKS } from "@/constants/app-links";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  name?: string;
  email?: string;
}

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState({
    name: "Loading...",
    email: "Loading...",
    avatar: "/avatars/shadcn.jpg",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        console.log("🧾 Decoded Token:", decoded);
        setUser((prev) => ({
          ...prev,
          name: decoded.name || "Unnamed",
          email: decoded.email || "No Email",
        }));
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    } else {
      console.warn("No token found in localStorage");
    }
  }, []);
  

  const data = {
    teams: [
      {
        name: (
          <div className="relative">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Snippet
            </span>
            <span className="text-black dark:text-white"> Hub</span>
          </div>
        ),
        logo: DataObjectIcon,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "All Snippets",
        url: `${APP_LINKS.DASHBOARD_OVERVIEW}`,
        icon: HiOutlineSquares2X2,
        isActive: false,
        items: [
          {
            title: "History",
            url: `${APP_LINKS.DASHBOARD_OVERVIEW}`,
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Favorites",
        url: `${APP_LINKS.DASHBOARD_FAVORITE}`,
        icon: IoMdHeartEmpty,
        items: [
          {
            title: "Genesis",
            url: `${APP_LINKS.DASHBOARD_FAVORITE}`,
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",   
          },
        ],
      },
      {
        title: "Trash",
        url: "#",
        icon: BsTrash,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    languages: [
      {
        name: "Javascript",
        url: "#",
        icon: IoLogoJavascript,
      },
      {
        name: "Python",
        url: "#",
        icon: AiOutlinePython,
      },
      {
        name: "C++",
        url: "#",
        icon: SiCplusplus,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects languages={data.languages} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
