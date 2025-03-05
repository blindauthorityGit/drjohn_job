import React from "react";

import Logo from "@/assets/logo.png";

const Menu = () => {
    return (
        <div className="w-full absolute h-24 p-16 grid grid-cols-12">
            <div className="col-span-4">
                <img src={Logo.src} alt="" />
            </div>
            <div className="col-span-3">BUBUBU</div>
        </div>
    );
};

export default Menu;
