"use client";
import { useCallback, useEffect, useState } from "react";
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
import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    const langParam = searchParams.get("lang");
    if (langParam) {
      setSelectedLanguage(langParam);
    }
  }, [searchParams]);

  const fetchLanguages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to view languages");
        return;
      }

      const res = await fetch("/api/snippet/language", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        setError("Session expired. Please login again.");
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setLangs(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load languages");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLanguageClick = (language: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedLanguage === language) {
      params.delete("lang");
      setSelectedLanguage(null);
    } else {
      params.set("lang", language);
      setSelectedLanguage(language);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);

  if (error) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Languages</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-red-500">
              <span>{error}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  if (loading) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Languages</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <MoreHorizontal className="animate-spin" />
              <span>Loading...</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Languages</SidebarGroupLabel>
      <SidebarMenu>
        {langs.map(({ language, count }) => {
          const Icon = iconMap[normalizeLang(language)] || MoreHorizontal;
          const isSelected = selectedLanguage === language;

          return (
            <SidebarMenuItem key={language}>
              <SidebarMenuButton
                onClick={() => handleLanguageClick(language)}
                className={isSelected ? "bg-accent" : ""}
              >
                <Icon />
                <span>{language}</span>
              </SidebarMenuButton>
              <SidebarMenuBadge>{count}</SidebarMenuBadge>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
