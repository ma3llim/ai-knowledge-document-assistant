"use client";

import * as React from "react";

import { NavWorkspaces } from "@/components/nav-workspaces";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarUser } from "./sidebar-user";
import logo from "@/assets/logo.png";
import { FiBookOpen, FiPlus } from "react-icons/fi";

// This is sample data.
const data = {
    workspaces: [
        {
            name: "Personal Life Management",
            emoji: "🏠",
            pages: [
                {
                    name: "Daily Journal & Reflection",
                    url: "#",
                    emoji: "📔",
                },
                {
                    name: "Health & Wellness Tracker",
                    url: "#",
                    emoji: "🍏",
                },
                {
                    name: "Personal Growth & Learning Goals",
                    url: "#",
                    emoji: "🌟",
                },
            ],
        },
        {
            name: "Professional Development",
            emoji: "💼",
            pages: [
                {
                    name: "Career Objectives & Milestones",
                    url: "#",
                    emoji: "🎯",
                },
                {
                    name: "Skill Acquisition & Training Log",
                    url: "#",
                    emoji: "🧠",
                },
                {
                    name: "Networking Contacts & Events",
                    url: "#",
                    emoji: "🤝",
                },
            ],
        },
        {
            name: "Creative Projects",
            emoji: "🎨",
            pages: [
                {
                    name: "Writing Ideas & Story Outlines",
                    url: "#",
                    emoji: "✍️",
                },
                {
                    name: "Art & Design Portfolio",
                    url: "#",
                    emoji: "🖼️",
                },
                {
                    name: "Music Composition & Practice Log",
                    url: "#",
                    emoji: "🎵",
                },
            ],
        },
        {
            name: "Home Management",
            emoji: "🏡",
            pages: [
                {
                    name: "Household Budget & Expense Tracking",
                    url: "#",
                    emoji: "💰",
                },
                {
                    name: "Home Maintenance Schedule & Tasks",
                    url: "#",
                    emoji: "🔧",
                },
                {
                    name: "Family Calendar & Event Planning",
                    url: "#",
                    emoji: "📅",
                },
            ],
        },
        {
            name: "Travel & Adventure",
            emoji: "🧳",
            pages: [
                {
                    name: "Trip Planning & Itineraries",
                    url: "#",
                    emoji: "🗺️",
                },
                {
                    name: "Travel Bucket List & Inspiration",
                    url: "#",
                    emoji: "🌎",
                },
                {
                    name: "Travel Journal & Photo Gallery",
                    url: "#",
                    emoji: "📸",
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar className="border-r-0" {...props}>
            <SidebarHeader>
                <div className="flex h-10 items-center gap-2 px-2">
                    <img src={logo} alt="AI Knowledge" className="size-10 object-contain" />
                    <span className="font-semibold tracking-tight">AI Knowledge</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="[&>svg]:size-5!">
                                    <FiPlus />
                                    <span>New Chat</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton className="[&>svg]:size-5!">
                                    <FiBookOpen />
                                    <span>Library</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <NavWorkspaces workspaces={data.workspaces} />
            </SidebarContent>

            <SidebarFooter>
                <SidebarUser />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
