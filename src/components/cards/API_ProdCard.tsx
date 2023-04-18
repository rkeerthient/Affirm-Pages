import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import Ce_product from "../../types/products";

type ProductCardProps = CardProps<any> & {
  autocomplete?: boolean;
};

const API_ProdCard = ({ result, autocomplete }: ProductCardProps) => {
  const product = result.rawData;
  const productImage = product.photoGallery[3];
  console.log(JSON.stringify(result));

  return (
    <>
      {
        <div
          key={product.id}
          className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
        >
          <div className="aspect-h-4 aspect-w-3 bg-white sm:aspect-none group-hover:opacity-75">
            <Image
              image={productImage}
              className="p-8 m-auto !object-contain"
            />
          </div>
          <div className="flex flex-1 flex-col space-y-4 p-4">
            <h3 className="text-sm font-medium text-gray-900">
              <span aria-hidden="true" className="  inset-0" />
              {product.name}
            </h3>
            {product.price && (
              <p className="text-sm font-bold">${product.price.value}</p>
            )}
            <div className="flex flex-1 flex-col justify-end">
              <div className="pl-3 mt-4">
                <a href={product.slug}>
                  <div className="text-center px-8 py-4 font-semibold border border-zinc-900 text-sm hover:bg-zinc-900 hover:text-white">
                    VIEW DETAILS
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export { API_ProdCard };
