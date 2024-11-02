const userValidator = (req, res, next) => {
    const {
        fullname,
        email,
        password,
        phonenumber,
        address_line_1,
        city,
        state,
        postal_code,
        country,
        userrole
    } = req.body;

    // Check for missing fields
    const missingFields = [];

    if (!fullname) missingFields.push("fullname");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!phonenumber) missingFields.push("phonenumber");
    if (!address_line_1) missingFields.push("address_line1");
    if (!city) missingFields.push("city");
    if (!state) missingFields.push("state");
    if (!postal_code) missingFields.push("postal_code");
    if (!country) missingFields.push("country");
    if (!userrole) missingFields.push("userrole");

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: "Validation Error: Missing fields",
            required_fields: missingFields
        });
    }

    next();
};

module.exports = userValidator;
