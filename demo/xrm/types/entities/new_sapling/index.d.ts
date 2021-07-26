export default interface new_sapling {
    /**
     * Unique identifier of the user who created the record.
     * @display Created By
     * @readonly
     */
    readonly createdby: any;
    /** @readonly */
    readonly createdbyname: string;
    /** @readonly */
    readonly createdbyyominame: string;
    /**
     * Date and time when the record was created.
     * @display Created On
     * @readonly
     */
    readonly createdon: Date;
    /**
     * Unique identifier of the delegate user who created the record.
     * @display Created By (Delegate)
     * @readonly
     */
    readonly createdonbehalfby: any;
    /** @readonly */
    readonly createdonbehalfbyname: string;
    /** @readonly */
    readonly createdonbehalfbyyominame: string;
    /**
     * Sequence number of the import that created this record.
     * @display Import Sequence Number
     * @readonly
     */
    readonly importsequencenumber: number;
    /**
     * Unique identifier of the user who modified the record.
     * @display Modified By
     * @readonly
     */
    readonly modifiedby: any;
    /** @readonly */
    readonly modifiedbyname: string;
    /** @readonly */
    readonly modifiedbyyominame: string;
    /**
     * Date and time when the record was modified.
     * @display Modified On
     * @readonly
     */
    readonly modifiedon: Date;
    /**
     * Unique identifier of the delegate user who modified the record.
     * @display Modified By (Delegate)
     * @readonly
     */
    readonly modifiedonbehalfby: any;
    /** @readonly */
    readonly modifiedonbehalfbyname: string;
    /** @readonly */
    readonly modifiedonbehalfbyyominame: string;
    /**
     * Required name field
     * @display ID
     */
    new_id: string;
    /**
     * Unique identifier for entity instances
     * @display Sapling
     * @readonly
     */
    readonly new_saplingid: string;
    /** @display School */
    new_school: any;
    /** @readonly */
    readonly new_schoolname: string;
    /** @display Species */
    new_species: any;
    /** @readonly */
    readonly new_speciesname: any;
    /** @display Student */
    new_student: any;
    /** @readonly */
    readonly new_studentname: string;
    /**
     * Date and time that the record was migrated.
     * @display Record Created On
     * @readonly
     */
    readonly overriddencreatedon: Date;
    /**
     * Owner Id
     * @display Owner
     */
    ownerid: any;
    /**
     * Name of the owner
     * @readonly
     */
    readonly owneridname: string;
    /** Owner Id Type */
    owneridtype: string;
    /**
     * Yomi name of the owner
     * @readonly
     */
    readonly owneridyominame: string;
    /**
     * Unique identifier for the business unit that owns the record
     * @display Owning Business Unit
     * @readonly
     */
    readonly owningbusinessunit: any;
    /**
     * Unique identifier for the team that owns the record.
     * @display Owning Team
     * @readonly
     */
    readonly owningteam: any;
    /**
     * Unique identifier for the user that owns the record.
     * @display Owning User
     * @readonly
     */
    readonly owninguser: any;
    /**
     * Status of the Sapling
     * @display Status
     */
    statecode: any;
    /** @readonly */
    readonly statecodename: any;
    /**
     * Reason for the status of the Sapling
     * @display Status Reason
     */
    statuscode: any;
    /** @readonly */
    readonly statuscodename: any;
    /**
     * For internal use only.
     * @display Time Zone Rule Version Number
     */
    timezoneruleversionnumber: number;
    /**
     * Time zone code that was in use when the record was created.
     * @display UTC Conversion Time Zone Code
     */
    utcconversiontimezonecode: number;
    /**
     * Version Number
     * @display Version Number
     * @readonly
     */
    readonly versionnumber: number;
}
