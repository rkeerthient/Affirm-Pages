export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_productCategory {
	primaryPhoto?: ComplexImage,
	slug?: string,
	name: string,
	c_breadcrumb1?: string,
	c_breadcrumb2?: string,
	c_breadcrumb3?: string,
	c_breadcrumb4?: string,
	c_childProducts?: EntityReference[],
	dm_directoryParents?: EntityReference[],
	photoGallery?: ComplexImage[],
	id: string,
}
