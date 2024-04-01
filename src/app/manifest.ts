import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "클릭소프트 앱",
    short_name: "클릭소프트 앱",
    description: "클릭소프트 앱",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    // icons: [
    //   {
    //     src: "/favicon.ico",
    //     sizes: "any",
    //     type: "image/x-icon",
    //   },
    // ],
  };
}
