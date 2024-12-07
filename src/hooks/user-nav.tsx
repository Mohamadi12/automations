import { usePathname } from "next/navigation";
import React from "react";

export const usePaths = () => {
  const pathname = usePathname();
  const path = pathname.split("/");
  let page = path[path.length - 1];
  return { page, pathname };
};


// Explictaion:
// Si tu es sur l'URL https://example.com/dashboard/settings, pathname sera égal à /dashboard/settings
// Decouper: /dashboard/settings deviendra un tableau ["", "dashboard", "settings"].
// Determiner: Avec /dashboard/settings, la dernière partie est "settings".