import { Noto_Sans_KR, Pacifico } from "next/font/google";
import localfont from "next/font/local";

export const natoSansKR = Noto_Sans_KR({ subsets: ["latin"] });

export const pacifico = Pacifico({ weight: "400", subsets: ['latin'] });

export const rubikDoodleShadow = localfont({
  src: "./ttfs/RubikDoodleShadow-Regular.ttf",
  style: "normal",
  weight: "400",
});
