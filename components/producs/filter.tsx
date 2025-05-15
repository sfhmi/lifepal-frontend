"use client";
import { useQueryState } from "nuqs";
import { memo } from "react";
import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";

const SORTBY = ["price", "rating"];
const SORT_MODE = ["asc", "desc"];

const Filter = () => {
  const [_, setSearch] = useQueryState("q");
  const [sortBy, setSortBy] = useQueryState("srt", { defaultValue: "price" });
  const [sortMode, setSortMode] = useQueryState("srtm", {
    defaultValue: "asc",
  });
  const [ctg, setCategory] = useQueryState("ctg");

  return (
    <div className="grid lg:grid-cols-2 gap-2 w-full">
      <Input
        fullWidth
        placeholder="Search"
        radius="sm"
        type="text"
        variant="bordered"
        onKeyDown={(e) => {
          setCategory(null);
          setTimeout(() => {
            setSearch(e.currentTarget.value);
          }, 500);
        }}
      />
      <div className="flex flex-row gap-2">
        <Select
          fullWidth
          aria-label="sort-by"
          classNames={{
            value: "capitalize",
          }}
          defaultSelectedKeys={[sortBy]}
          radius="sm"
          variant="bordered"
          onChange={(e) => setSortBy(e.target.value)}
        >
          {SORTBY.map((item: string) => (
            <SelectItem key={item} className="capitalize">
              {item}
            </SelectItem>
          ))}
        </Select>
        <Select
          fullWidth
          aria-label="sort-mode"
          classNames={{
            value: "capitalize",
          }}
          defaultSelectedKeys={[sortMode]}
          radius="sm"
          variant="bordered"
          onChange={(e) => setSortMode(e.target.value)}
        >
          {SORT_MODE.map((item: string) => (
            <SelectItem key={item} className="capitalize">
              {item}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default memo(Filter);
