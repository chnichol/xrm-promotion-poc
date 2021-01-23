const clearFutureDate = (attr) => attr && attr.getValue() > new Date() ? attr.setValue() || attr : attr;

export { clearFutureDate };