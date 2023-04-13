export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_categoryLevel4 {
	slug?: string,
	name: string,
	dm_baseEntityCount?: string,
	dm_childEntityIds?: string[],
	dm_directoryChildren?: EntityReference[],
	dm_directoryManagerId?: string,
	dm_directoryParents?: EntityReference[],
	id: string,
}
