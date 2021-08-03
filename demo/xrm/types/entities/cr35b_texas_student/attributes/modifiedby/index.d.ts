import { Attribute } from "xrm-types";
import Entity from "../../index";

/** Unique identifier of the user who modified the record. */
export default interface modifiedby extends Attribute<Entity["modifiedby"]> {
}
