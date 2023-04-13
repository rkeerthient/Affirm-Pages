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
          <div className="">
            <div className="h-16 items-center justify-between flex gap-4">
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
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <a href="/home">Home</a>
                {!searchOpen && <CategoryPanel rootCategory={rootCategory} />}
                <a href="/retail-page">Stores</a>
              </div>
              {/* <div className={twMerge("flex", searchOpen ? "col-span-2" : "")}>
                <div className="flex-1 items-center justify-end hidden lg:flex ">
                  <div className="my-auto max-w-xs w-full">
                    <SearchBar
                      setVisAutoOpen={setVisAutoOpen}
                      customCssClasses={{
                        searchBarContainer: "mb-0 ",
                        recentSearchesIcon: "hidden",
                        recentSearchesOption: "hidden",
                        recentSearchesNonHighlighted: "hidden",
                        clearButton: "hidden",
                      }}
                    />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export { CustomHeader };
