import * as React from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useState, Fragment } from "react";
import { XMarkIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ComplexImageType, Image, ImageType } from "@yext/pages/components";

export type Category = {
  id: string;
  name?: string;
  href?: string;
  logo?: ComplexImageType;
  subCategories?: Category[];
};

type MobileMenuProps = {
  category: Category;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const MobileMenu = ({ category, open, setOpen }: MobileMenuProps) => {
  const [currentCategory, setCurrentCategory] = useState<Category>(category);
  const [previousCategories, setPreviousCategories] = useState<Category[]>([]);

  const handleSubCategoryClick = (subCategory: Category) => {
    if (subCategory.subCategories) {
      setCurrentCategory(subCategory);
      setPreviousCategories([...previousCategories, currentCategory]);
    } else {
      // TODO: route to category search page
    }
  };

  const handleBackClick = () => {
    if (previousCategories.length > 0) {
      const previousCategory = previousCategories.pop() as Category;
      setCurrentCategory(previousCategory);
      setPreviousCategories(previousCategories);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pt-5 pb-2">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {currentCategory?.name && (
                <div className="flex px-2 py-2 space-x-4">
                  {previousCategories.length > 0 && (
                    <button type="button" onClick={handleBackClick}>
                      <ChevronRightIcon className="h-6 w-6 transform rotate-180" />
                    </button>
                  )}
                  <p className="font-bold text-2xl">{currentCategory.name}</p>
                </div>
              )}
              {currentCategory?.subCategories?.map(
                (subCategory, sectionIdx) => (
                  <button
                    key={sectionIdx}
                    className="px-4 py-2"
                    onClick={() => handleSubCategoryClick(subCategory)}
                  >
                    <div
                      key={subCategory.name}
                      className="flex justify-between"
                    >
                      <a
                        id={`${subCategory.id}-heading-mobile`}
                        className="font-semibold text-gray-900 text-lg hover:underline"
                        href={subCategory.href}
                      >
                        {subCategory.name}
                      </a>
                      {subCategory.subCategories && (
                        <ChevronRightIcon className="h-6 w-6" />
                      )}
                      {subCategory.logo && (
                        // <Image
                        //   width={125}
                        //   height={80}
                        //   layout="fixed"
                        //   image={subCategory.logo}
                        // />
                        // TODO: fix image
                        <></>
                      )}
                    </div>
                  </button>
                )
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export { MobileMenu };
