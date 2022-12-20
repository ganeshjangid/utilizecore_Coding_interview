const responseOriginCros = (req, res) => { // Website you wish to allow to connect
    const origin = req.header('Origin');
    res.header('Access-Control-Allow-Origin', origin);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
};

export const sendError = (req, res, message, code) => {
    responseOriginCros(req, res);
    // Error Web Response
    const result = {
        type: "failed",
        message: message,
        data: {}
    };
    return res.status(code).json(result);
};

export const sendSuccess = function (req, res, message, data, code) { // Success Web Response
    responseOriginCros(req, res);
    const result = {
        type: "success",
        message: message,
        data: data
    };
    return res.status(code).json(result);
};
