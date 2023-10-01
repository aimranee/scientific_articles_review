import Select from "../Select";
import { type FC } from "react";
import { Languages } from "@/enums.d";
import IconWrapper from "../IconWrapper";

interface LanguageSelectorProps {
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectName: string;
  options: Languages[];
  defaultOption?: Languages[];
  value: Languages;
  children?: React.ReactNode;
}

const LanguageSelector: FC<LanguageSelectorProps> = ({
  selectName,
  value,
  options,
  defaultOption,
  onSelectChange,
  children,
}) => {
  return (
    <div className="flex flex-1 flex-col gap-2 relative">
      <Select
        onChange={onSelectChange}
        value={value}
        name={selectName}
        className={`h-10 rounded-md appearance-none bg-gray-3 pl-5 py-2 pr-10 cursor-pointer rounded-b-none border-b dark:border-gray-2`}
      >
        {defaultOption && <Select.Option options={defaultOption} />}
        <Select.Option options={options} />
      </Select>
      <button className="pointer-events-none absolute top-0 right-0 pr-5 h-[40px] flex items-center"></button>
      {children}
    </div>
  );
};

export default LanguageSelector;
