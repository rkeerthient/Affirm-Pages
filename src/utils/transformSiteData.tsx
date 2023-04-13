import { ComplexImageType } from "@yext/pages/components";
// import { Category } from "../components/mobile/MobileMenu";

// I have the followng data structure:
type dm_directoryChild = {
  id: string;
  name?: string;
  slug?: string;
  c_logo?: ComplexImageType;
  dm_directoryChildren?: dm_directoryChild[];
};

const transformSiteData = (data: dm_directoryChild): any => {
  return {
    id: data.id,
    name: data.name,
    href: data.slug,
    logo: data.c_logo,
    subCategories: data.dm_directoryChildren?.map(transformSiteData),
  };
};

export { transformSiteData };
