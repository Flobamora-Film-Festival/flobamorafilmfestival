import React from "react";
import SidebarItem from "./SidebarItem";

const SidebarMenu = ({ isOpen }) => {
  return (
    <div className="mt-4">
      <ul>
        <SidebarItem label="Dashboard" icon="🏠" isOpen={isOpen} />
        <SidebarItem label="Artikel" icon="📝" isOpen={isOpen} />
        <SidebarItem label="Kompetisi" icon="🏆" isOpen={isOpen} />
        <SidebarItem label="Media" icon="🎥" isOpen={isOpen} />
        <SidebarItem label="Pengguna" icon="👥" isOpen={isOpen} />
        <SidebarItem label="Pengaturan" icon="⚙️" isOpen={isOpen} />
      </ul>
    </div>
  );
};

export default SidebarMenu;
