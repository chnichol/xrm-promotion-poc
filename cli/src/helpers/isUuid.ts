 const isUuid = (text: string): boolean => {
    const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/g;
    return (text.match(uuidRegex) ?? []).length > 0
}

export default isUuid;