import React from "react";

const SidebarItem = ({ label, icon, isOpen }) => {
  return (
    <li className="py-2 px-4 hover:bg-gray-700 transition-all">
      <span className="flex items-center">
        <span className="mr-4">{icon}</span>
        {isOpen && <span>{label}</span>}
      </span>
    </li>
  );
};

export default SidebarItem;
