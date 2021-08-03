import { Attribute } from "xrm-types";
import Entity from "../../index";

/** Unique identifier for the user that owns the record. */
export default interface owninguser extends Attribute<Entity["owninguser"]> {
}
