import { Attribute } from "xrm-types";
import Entity from "../../index";

/** Unique identifier of the user who created the record. */
export default interface createdby extends Attribute<Entity["createdby"]> {
}
