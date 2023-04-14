import * as React from "react";
import { Category, MobileMenu } from "./mobile/MobileMenu";
import { useState } from "react";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ComplexImageType, Link } from "@yext/pages/components";
import { MobileSearch } from "./mobile/MobileSearch";
import { Image } from "@yext/pages/components";
import { twMerge } from "tailwind-merge";
import { SearchBar } from "./SearchBar";
import { CategoryPanel } from "./CategoryPanel";
import { Transition } from "@headlessui/react";

export type HeaderProps = {
  rootCategory: Category;
  logo?: ComplexImageType;
};

const CustomHeader = ({ rootCategory }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [visAutoOpen, setVisAutoOpen] = useState(false);

  const handleMobileSearchIconClick = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  const handleSearchIconClick = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <div className="bg-white">
      <MobileSearch open={mobileSearchOpen} setOpen={setMobileSearchOpen} />
      <MobileMenu
        category={rootCategory}
        open={mobileMenuOpen}
        setOpen={setMobileMenuOpen}
      />

      <header className="relative bg-white z-20">
        <Transition
          show={searchOpen}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-0"
          enterTo="-translate-x-1/2"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="-translate-x-1/2"
          leaveTo="translate-x-0"
        >
          <div
            className={twMerge(
              "absolute -z-10",
              searchOpen ? "left-4" : "left-1/2"
            )}
          >
            <div
              className={twMerge(
                "h-16 flex justify-center items-center"
                // searchOpen ? "ml-4" : ""
              )}
            >
              <div>
                {rootCategory.logo && (
                  <Image className="h-8 w-auto" image={rootCategory.logo} />
                )}
              </div>
            </div>
          </div>
        </Transition>

        <nav aria-label="Top" className="mx-auto px-6 ">
          <div className="h-16 items-center pt-2">
            <div className="flex flex-1 items-center lg:hidden">
              <div>
                <button
                  type="button"
                  className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  onClick={() => handleMobileSearchIconClick()}
                  className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="flex gap-4 items-center justify-start">
              <div>
                <svg
                  viewBox="0 0 420 167"
                  xmlns="http://www.w3.org/2000/svg"
                  className="Header-logo--7o3IK"
                >
                  <g clipRule="evenodd" fillRule="evenodd">
                    <g fill="#101820" className="svg-fill">
                      <path d="M34.3 94.1c-11.3 0-24.4 5.4-31.5 11l6.5 13.6c5.7-5.2 14.9-9.6 23.2-9.6 7.9 0 12.2 2.6 12.2 7.9 0 3.6-2.9 5.4-8.3 6.1C16 125.7 0 131.3 0 147c0 12.4 8.9 20 22.7 20 9.9 0 18.7-5.5 22.9-12.7V165H64v-44.9c0-18.5-12.9-26-29.7-26zm-6.9 58.5c-5.2 0-7.8-2.5-7.8-6.7 0-7.8 8.7-10.4 24.6-12.1.1 10.4-7 18.8-16.8 18.8zM237.5 107.7V96.1h-18.4V165h19.7v-33.2c0-15.8 9.5-20.4 16.2-20.4 2.6 0 6.1.8 8.4 2.5l3.6-18.2c-3-1.3-6.2-1.6-8.8-1.6-10.1 0-16.5 4.5-20.7 13.6zM358.4 94.1c-10.4 0-18.2 6.2-22.3 12.1-3.8-7.7-11.7-12.1-21.3-12.1-10.4 0-17.6 5.8-21 12.4V96.1h-19V165h19.7v-35.5c0-12.7 6.7-18.8 12.9-18.8 5.6 0 10.8 3.6 10.8 13V165H338v-35.5c0-12.9 6.5-18.8 13-18.8 5.2 0 10.7 3.8 10.7 12.9V165h19.7v-47.6c0-15.5-10.4-23.3-23-23.3zM133.6 91v5.1h-29.9v-7c0-9.1 5.2-11.7 9.7-11.7 2.6 0 6 .6 8.8 2.2l6.1-13.9c-3.6-2.1-9.5-4-17.4-4-12.6 0-26.9 7.1-26.9 29.4v5.1H72.6v15.2H84V165h19.7v-53.7h29.9V165h19.7v-53.7h17.9V96.1h-17.9v-7c0-9.1 5.2-11.7 9.7-11.7 5 0 8.8 2.2 8.8 2.2l6.1-13.9s-6.2-4-17.4-4c-12.5-.1-26.9 7-26.9 29.3zM182.9 96.1h19.7V165h-19.7z"></path>
                    </g>
                    <path
                      d="M297.7 0c-53.2 0-100.6 36.9-114 84.4H203C214.2 49 252.3 18 297.7 18c55.2 0 102.8 42 102.8 107.4 0 14.7-1.9 27.9-5.5 39.6h18.7l.2-.6c3.1-12.1 4.6-25.2 4.6-39C418.5 52.5 365.4 0 297.7 0"
                      className="svg-fill rainbow"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="flex gap-4 custNav">
                <div className="flex">
                  <a href="/home">Home</a>
                  <div className="mx-4">|</div>
                </div>
                <div className="flex">
                  <CategoryPanel rootCategory={rootCategory} />
                  <div className="mx-4">|</div>
                </div>
                <div className="flex">
                  <a href="/retail-page">Stores</a>
                  <div className="mx-4"> </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export { CustomHeader };
