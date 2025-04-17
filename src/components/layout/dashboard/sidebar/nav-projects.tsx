"use client";

import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconType } from "react-icons/lib";

// reuse your icon map from elsewhere:
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiC,
  SiCplusplus,
  SiGo,
  SiPhp,
  SiRuby,
  SiKotlin,
  SiSwift,
  SiRust,
  SiJson,
  SiHtml5,
  SiCss3,
  SiSass,
  SiMysql,
  SiMarkdown,
  SiGnubash,
  SiYaml,
  SiDocker,
  SiPerl,
  SiLua,
  SiR,
  SiPostgresql,
  SiMongodb,
  SiVuedotjs,
  SiReact,
  SiSharp,
} from "react-icons/si";

interface LanguageCount {
  language: string;
  count: number;
}

const iconMap: Record<string, IconType> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  C: SiC,
  "C++": SiCplusplus,
  Cpp: SiCplusplus,
  "C#": SiSharp,
  Csharp: SiSharp,
  Go: SiGo,
  PHP: SiPhp,
  Php: SiPhp,
  Ruby: SiRuby,
  Kotlin: SiKotlin,
  Swift: SiSwift,
  Rust: SiRust,
  JSON: SiJson,
  Json: SiJson,
  HTML: SiHtml5,
  Html: SiHtml5,
  CSS: SiCss3,
  Css: SiCss3,
  SCSS: SiSass,
  Scss: SiSass,
  SQL: SiMysql,
  Sql: SiMysql,
  PostgreSQL: SiPostgresql,
  Postgresql: SiPostgresql,
  MongoDB: SiMongodb,
  Mongodb: SiMongodb,
  Markdown: SiMarkdown,
  Bash: SiGnubash,
  Shell: SiGnubash,
  YAML: SiYaml,
  Yaml: SiYaml,
  Dockerfile: SiDocker,
  Docker: SiDocker,
  Perl: SiPerl,
  Lua: SiLua,
  R: SiR,
  Vue: SiVuedotjs,
  React: SiReact,
};

const normalizeLang = (lang: string) => {
  switch (lang.toLowerCase()) {
    case "python":
      return "Python";
    case "c":
      return "C";
    case "typescript":
      return "TypeScript";
    case "javascript":
      return "JavaScript";
    case "c++":
    case "cpp":
      return "C++";
    case "c#":
    case "csharp":
      return "C#";
    case "go":
      return "Go";
    case "php":
      return "PHP";
    case "ruby":
      return "Ruby";
    case "kotlin":
      return "Kotlin";
    case "swift":
      return "Swift";
    case "rust":
      return "Rust";
    case "json":
      return "JSON";
    case "html":
      return "HTML";
    case "css":
      return "CSS";
    case "scss":
      return "SCSS";
    case "sql":
      return "SQL";
    case "postgresql":
      return "PostgreSQL";
    case "mongodb":
      return "MongoDB";
    case "markdown":
      return "Markdown";
    case "bash":
    case "shell":
      return "Bash";
    case "yaml":
      return "YAML";
    case "ini":
      return "INI";
    case "dockerfile":
    case "docker":
      return "Dockerfile";
    case "perl":
      return "Perl";
    case "lua":
      return "Lua";
    case "r":
      return "R";
    case "vue":
      return "Vue";
    case "react":
      return "React";
    default:
      return lang.charAt(0).toUpperCase() + lang.slice(1);
  }
};

export function NavProjects() {
  const [langs, setLangs] = useState<LanguageCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/snippet/language");
        if (!res.ok) throw new Error("Failed to load languages");
        const data: LanguageCount[] = await res.json();
        setLangs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Languages</SidebarGroupLabel>
      <SidebarMenu>
        {loading ? (
          <SidebarMenuItem>
            <SidebarMenuButton className="opacity-50 cursor-wait">
              <MoreHorizontal className="animate-spin" />
              <span>Loading…</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : (
          langs.map(({ language, count }) => {
            const Icon = iconMap[normalizeLang(language)] || MoreHorizontal;
            
            return (
              <SidebarMenuItem key={language}>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-gradient-to-r from-blue-600 to-blue-800 hover:text-white transition-all duration-150"
                >
                  <a href={`#lang-${language}`}>
                    <Icon />
                    <span>{language}</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuBadge>{count}</SidebarMenuBadge>
              </SidebarMenuItem>
            );
          })
        )}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
