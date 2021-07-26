import { Attribute } from "xrm-types";
import Entity from "../../index";

/** Unique identifier for the team that owns the record. */
export default interface owningteam extends Attribute<Entity["owningteam"]> {
}
