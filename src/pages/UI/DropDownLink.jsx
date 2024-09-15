/* eslint-disable react/prop-types */
import  { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { Home } from "lucide-react";
// import { IoMdArrowDropdown } from "react-icons/io";

const DropdownLink = ({ mainPath, mainLabel, subPaths = [], icon: Icon }) => {
  const history = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const goto = (path) => {
    history(path);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <NavLink
        to={mainPath}
        className={({ isActive }) => `flex items-center gap-4 rounded-lg p-4 transition-all hover:text-primary hover:bg-muted ${isActive ? "bg-muted text-primary" : "text-muted" }`}
      >
        {Icon && <Icon />}
        {mainLabel}
      </NavLink>
      {/* <div
        onClick={() => {
          goto(mainPath);
          toggleDropdown();
          toggleSidebar();
        }}
        className={`navbar-link-item ${
          location.pathname === mainPath && "navbar-active-side-menu"
        }`}
      >
        <div className="flex-link">
          <div className="flex">
            {Icon && <Icon className="icon" />} {/*   }
            {mainLabel}
          </div>
          {subPaths.length > 0 && (
            <div className="opwo">
              <span>{ <IoMdArrowDropdown /> }</span>
            </div>
          )}
        </div>
      </div> */}
      {
        subPaths.map((subPath) => (
             <NavLink
        key={subPath.path}
        to={subPath.path}
        className={({ isActive }) => `flex items-center gap-4 rounded-lg p-4 transition-all hover:text-primary hover:bg-muted ${isActive ? "bg-muted text-primary" : "text-muted" }`}
      >
        {Icon && <Home className="h-4 w-4" />}
      {subPath.label}
      </NavLink>
          // <div
          //   key={subPath.path}
          //   onClick={() => {
          //     goto(subPath.path), toggleSidebar();
          //   }}
          //   className={`navbar-link-item-sub ${
          //     location.pathname === subPath.path && "navbar-active-side-menu"
          //   }`}
          // >
          //   {subPath.label}
          // </div>
        ))
        }
    </>
  );
};

export default DropdownLink;
