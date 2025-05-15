"use client";

import { Button } from "@heroui/button";
import { useTheme } from "@heroui/use-theme";
import { Fragment, memo } from "react";

import { MoonFilledIcon, SunFilledIcon } from "@/components/icons";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Fragment>
      <Button
        isIconOnly
        radius="full"
        variant="light"
        onPress={() => setTheme(theme == "light" ? "dark" : "light")}
      >
        {theme == "light" ? (
          <MoonFilledIcon size={22} />
        ) : (
          <SunFilledIcon size={22} />
        )}
      </Button>
    </Fragment>
  );
};

export default memo(ThemeSwitcher);
