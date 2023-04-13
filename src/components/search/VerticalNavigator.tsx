import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { useSearchActions } from "@yext/search-headless-react";
import { universalResultsConfig } from "./UniversalResults";

export type Vertical = {
  label: string;
  verticalKey?: string;
  count?: number;
};

type VerticalNavigatorProps = {
  verticals: Vertical[];
};

const VerticalNavigator = ({ verticals }: VerticalNavigatorProps) => {
  const searchActions = useSearchActions();

  const [activeVertical, setActiveVertical] = React.useState<{
    label: string;
    verticalKey?: string;
  }>(verticals[0]);

  const handleVerticalClick = (vertical: Vertical) => {
    setActiveVertical(vertical);
    if (vertical.verticalKey) {
      searchActions.setVertical(vertical.verticalKey);
      searchActions.executeVerticalQuery();
    } else {
      searchActions.setUniversal();
      searchActions.setRestrictVerticals(Object.keys(universalResultsConfig));
      searchActions.executeUniversalQuery();
    }
  };

  return (
    <>
      <div className="hidden sm:flex px-4 my-4 border-b-2 border">
        {verticals.map((vertical) => (
          <button
            key={`nav-button-${vertical}`}
            className={twMerge(
              "flex justify-center items-center px-6 py-2 border-b-2 hover:bg-gray-100",
              activeVertical.label === vertical.label
                ? "border-black"
                : "border-transparent"
            )}
            onClick={() => handleVerticalClick(vertical)}
          >
            <p className="text-sm">
              {vertical.label}
              {vertical.count && (
                <span className="ml-0.5">{`(${vertical.count})`}</span>
              )}
            </p>
          </button>
        ))}
      </div>
    </>
  );
};

export { VerticalNavigator };
