'use client';

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo_webuildSites-com-gradiente-branco-768x151.png"

export default function Logo() {
    return (
        <Link href="#">
            <Image src={logo} alt="" width={200} />
        </Link>
    )
}