import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-text/80 transition-colors duration-150 hover:bg-text/5 hover:text-text"
    >
      {theme === "light" ? (
        <IconMoon className="h-[18px] w-[18px]" stroke={1.75} />
      ) : (
        <IconSun className="h-[18px] w-[18px]" stroke={1.75} />
      )}
    </button>
  );
};

export default ThemeToggle;
