import { WebResourceType } from "../../types/entity/WebResource";

export const getExtension = (webResource: { webresourcetype: WebResourceType }) => WebResourceType[webResource.webresourcetype].toLowerCase().replace(/jscript/g, 'js');