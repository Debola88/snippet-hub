"use client"

import {
  // Folder,
  // Forward,
  MoreHorizontal,
  // Trash2,
} from "lucide-react"

import {
  // DropdownMenu,
  // DropdownMenuContent,
  // DropdownMenuItem,
  // DropdownMenuSeparator,
  // DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  // SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  // useSidebar,
} from "@/components/ui/sidebar"
import { IconType } from "react-icons/lib"

export function NavProjects({
  languages,
}: {
  languages: {
    name: string
    url: string
    icon: IconType
  }[]
}) {

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Languages</SidebarGroupLabel>
      <SidebarMenu>
        {languages.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild className="hover:bg-gradient-to-r from-blue-600 to-blue-800 hover:text-white transition-all duration-150">
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuBadge>24</SidebarMenuBadge>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
