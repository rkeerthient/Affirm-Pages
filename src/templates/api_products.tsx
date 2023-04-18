/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import { Image } from "@yext/pages/components";
import * as React from "react";
import Banner from "../components/banner";
import Example from "../components/cards/Example";
import Contact from "../components/contact";
import Cta from "../components/cta";
import Hours from "../components/hours";
import List from "../components/list";
import PageLayout from "../components/page-layout";
import StarRating from "../components/starRating";
import StaticMap from "../components/static-map";
import "../index.css";
import { transformSiteData } from "../utils/transformSiteData";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-products",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "price.value",
      "richTextDescription",
      "primaryPhoto",
      "photoGallery",
      "c_shippingType",
      "c_originalPrice.value",
      "c_shippingPrice.value",
      "c_totalPrice.value",
      "c_discountPercentage",
      "brand",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      savedFilterIds: ["1298351520"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ?? document.name;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};
export const transformProps: TransformProps<TemplateRenderProps> = async (
  data
) => {
  const { _site } = data.document;
  return {
    ...data,
    document: {
      ...data.document,
      _site: transformSiteData(_site),
    },
  };
};
/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const API_Products: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    price,
    richTextDescription,
    primaryPhoto,
    photoGallery,
    c_originalPrice,
    c_shippingPrice,
    c_totalPrice,
    c_shippingType,
    c_discountPercentage,
    brand,
    condition,
  } = document;
  const [randNum, setRandNum] = React.useState<number>(0);
  const genRand = (min: number, max: number, decimalPlaces: number) => {
    var rand = Math.random() * (max - min) + min;
    var power = Math.pow(10, decimalPlaces);
    setRandNum(Math.floor(rand * power) / power);
  };
  React.useEffect(() => {
    genRand(0, 5, 2);
  }, []);
  return (
    <>
      <PageLayout _site={_site}>
        <div className="centered-container">
          <div className="section bg-white ">
            <a href="/products-results">
              <div className="w-fit p-1 ml-10 bg-white border-black border  text-black  font-light mt-5 hover:bg-black hover:text-white">
                {`<- Back`}
              </div>
            </a>

            <div className="flex flex-row items-center">
              <div className="w-1/2">
                <Image image={photoGallery[3]} className="m-auto"></Image>
              </div>
              <div className="w-1/2 lex flex-col">
                <h1 className="text-2xl font-medium text-gray-900">{name}</h1>
                <div className="flex flex-row gap-2 items-center my-auto mt-4">
                  <div>Price: </div>
                  <div>
                    {c_discountPercentage ? (
                      <div className="flex gap-3 items-center">
                        <p className=" font-medium text-red-700 text-lg">
                          ${price.value}
                        </p>
                        <p className="rounded-full bg-red-700 text-white uppercase text-xs py-1 px-2">
                          save {parseInt(c_discountPercentage)}%
                        </p>
                        <p className="strikethrough text-gray-700 text-sm">
                          ${c_originalPrice.value}
                        </p>
                      </div>
                    ) : (
                      <p className=" font-medium text-gray-900">
                        ${price.value}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-2 h-4">
                    <StarRating selectedStars={randNum} />
                    <div className="text-sm">{randNum}</div>
                  </div>
                </div>
                <div className="flex flex-row gap-2 items-center my-auto mt-4">
                  <div>Brand: </div>
                  <div className="font-medium text-gray-900">{brand}</div>
                </div>
                <div className="flex flex-row gap-2 items-center my-auto mt-4">
                  <div>Item condition: </div>
                  <div className="font-medium text-gray-900">{condition}</div>
                </div>

                <div className="mt-8 lg:col-span-5">
                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">
                      Description
                    </h2>
                    <div className="prose prose-sm mt-4 text-gray-500">
                      {richTextDescription}
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h2 className="text-sm font-medium text-gray-900">
                    Shipping Details
                  </h2>
                  <div className="grid grid-cols-3 border mt-3">
                    <div className="p-2 text-sm border text-center">
                      Shipping Type
                    </div>
                    <div className="p-2 text-sm border text-center">
                      Shipping Price
                    </div>
                    <div className="p-2 text-sm border text-center">
                      Total Price
                    </div>
                    <div className="p-2 text-sm border text-center text-gray-900 capitalize">
                      {c_shippingType}
                    </div>
                    <div className="p-2 text-sm border text-center text-gray-900">
                      ${c_shippingPrice.value}
                    </div>
                    <div className="p-2 text-sm border text-center text-gray-900">
                      ${c_totalPrice.value}
                    </div>
                  </div>
                </div>

                <div className="w-3/4 mx-auto p-6 text-center text-xl bg-black text-white font-semibold mt-5">
                  Buy now
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default API_Products;
