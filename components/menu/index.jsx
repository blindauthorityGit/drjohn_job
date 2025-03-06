import React from "react";
import Link from "next/link";
import Logo from "@/assets/logo.png";

const Menu = ({ showLink }) => {
    return (
        <div className="w-full absolute h-24 p-16 grid grid-cols-12 font-headline">
            <div className="col-span-4">
                <Link href="/">
                    <img src={Logo.src} alt="" />
                </Link>
            </div>
            <div className="col-span-3 flex items-end ">
                {showLink && (
                    <Link className="tracking-wider underline text-sm" href="/">
                        zur Übersicht
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Menu;
