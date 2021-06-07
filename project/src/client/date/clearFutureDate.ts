const clearFutureDate = (attr: any) => attr && attr.getValue() > new Date() ? attr.setValue() || attr : attr;

export { clearFutureDate };