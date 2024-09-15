import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const DropdownMenu = ({ mainPath, mainLabel, subPaths = [], icon: Icon,onToggle }) => {
  return (
    <>
      <NavLink
        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary mt-2
          ${open ? "bg-muted/90 text-primary" : "text-dark-foreground bg-white"}
        `}
        onClick={onToggle}
      >
        {mainPath}
        <ChevronRight
          className={`icon h-5 w-5 ml-auto ${true? "rotated" : ""}`}
        />
      </NavLink>

      {true && (
        <div className="ps-3">
          {subPaths.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive
                  ? `flex items-center gap-3 rounded-lg bg-muted/90 px-3 py-2 text-primary transition-all hover:text-primary mt-2`
                  : `flex items-center gap-3 rounded-lg bg-white px-3 py-2 text-dark-foreground transition-all hover:text-primary mt-2`
              }
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};

export default DropdownMenu;
