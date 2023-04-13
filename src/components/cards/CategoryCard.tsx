import { CardProps } from "@yext/search-ui-react";
import * as React from "react";

const CategoryCard = ({ result }: CardProps<any>) => {
  const category = result.rawData;
  return (
    <a href={category.slug} className="text-xl text-center">
      <div className="hover:cursor-pointer flex flex-col justify-between px-4 py-4 border-2 m-4 border-[#1a1a1a] items-center hover:bg-[#1a1a1a] hover:text-white text-[#1a1a1a] max-w-sm">
        {category.name}
      </div>
    </a>
  );
};

export { CategoryCard };
