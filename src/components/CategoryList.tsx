import * as React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Category } from "./mobile/MobileMenu";

type CategoryProps = {
  panelIdx: number;
  category: Category;
  handleSubCategoryClick?: (subCategory: Category, panelIdx: number) => void;
  handleExitHover?: () => void;
};

const CategoryList = ({
  panelIdx,
  category,
  handleSubCategoryClick,
}: CategoryProps) => {
  console.log(JSON.stringify(category));

  return (
    <div className="w-1/6 bg-white shadow overflow-y-auto max-h-[calc(100vh-64px)] z-50">
      <ul role="list" className="py-4 flex flex-col">
        {category.subCategories?.map((subCat) => (
          <a
            key={`${subCat.id}-desktop`}
            className="px-4 py-2 hover:bg-gray-200 font-semibold text-gray-900 text-base text-left"
            href={subCat.href}
            onMouseEnter={() =>
              handleSubCategoryClick && subCat.subCategories
                ? handleSubCategoryClick(subCat, panelIdx)
                : null
            }
          >
            <div className="flex justify-between">
              {subCat.name}
              {subCat.subCategories && <ChevronRightIcon className="h-6 w-6" />}
            </div>
          </a>
        ))}
      </ul>
    </div>
  );
};

export { CategoryList };
