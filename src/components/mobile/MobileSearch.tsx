import * as React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SearchBar } from "../SearchBar";

type MobileSearchProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const MobileSearch = ({ open, setOpen }: MobileSearchProps) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 lg:hidden" onClose={setOpen}>
        <div className="fixed inset-0 top-16" />
        <div className="fixed inset-0 top-16 overflow-hidden">
          <div className="absolute inset-0 top-16 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 top-16 right-0 left-0 flex max-w-full ">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen ">
                  <div className="flex h-full flex-col overflow-y-scroll bg-stone-100 py-6 shadow-xl relative">
                    <div className="px-4 sm:px-6">
                      <SearchBar mobile />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export { MobileSearch };
