import Image from "next/image";
import logo from "@/public/images/logo_webuildSites-com-gradiente-branco-768x151.png";

export default function Logo() {
    return (
        <Image src={logo} alt="WeBuildSites Logo" width={200} priority />
    );
}