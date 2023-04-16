import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import Ce_product from "../../types/products";

type RetailCardProps = CardProps<any> & {
  autocomplete?: boolean;
};

const RetailCard = ({ result, autocomplete }: RetailCardProps) => {
  const product = result.rawData;
  const productImage = product.primaryPhoto;

  return (
    <>
      {
        <div
          key={product.id}
          className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
        >
          <div className="aspect-h-1 aspect-w-3 bg-white sm:aspect-none group-hover:opacity-75 sm:h-56 m-auto flex items-center">
            <Image
              style={{ maxHeight: "250px" }}
              image={productImage}
              className="p-4 m-auto !object-contain"
            />
          </div>
          <div className="flex flex-1 flex-col space-y-2 p-4">
            <h3 className="text-sm font-medium text-gray-900">
              <span aria-hidden="true" className="  inset-0" />
              {product.name}
            </h3>
            <div className="flex flex-1 flex-col justify-end">
              {product.price && (
                <p className="text-sm">${product.price.value}</p>
              )}
              <div className="pl-3 mt-4">
                <div className="text-center px-8 py-4 font-semibold border border-zinc-900 text-sm hover:bg-zinc-900 hover:text-white">
                  VIEW OPTIONS
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export { RetailCard };
