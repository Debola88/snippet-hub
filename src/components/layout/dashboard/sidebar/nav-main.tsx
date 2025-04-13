"use client";
import { useEffect, useState } from "react";
import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconType } from "react-icons/lib";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: IconType;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/snippet/favorite", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setFavoriteCount(data.length || 0);
        }
      } catch (err) {
        console.error("Error fetching favorites", err);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <a href={item.url}>
                <SidebarMenuButton
                  key={item.title}
                  className="hover:bg-gradient-to-r from-blue-600 to-blue-800 hover:text-white transition-all duration-150"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
                {item.title === "Favorites" && favoriteCount > 0 && (
                  <SidebarMenuBadge>{favoriteCount}</SidebarMenuBadge>
                )}
              </a>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
