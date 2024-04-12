

const AlphaNumericString = /^[a-zA-Z0-9\s.!%^&*(),.?":{}|<>]+$/;
const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/


module.exports = { AlphaNumericString, timeRegex, phoneRegex }