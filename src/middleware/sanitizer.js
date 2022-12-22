export let sanitize = function (ignore =['name', 'option', 'start', 'end']) {
    return(req, res, next) => {
        let data = [];
        if (req.body) {
            data = Object.keys(req.body);
            for (let i = 0; i < data.length; i++) {
                if (ignore.indexOf(data[i]) == -1 && typeof req.body[data[i]] == 'string') {
                    req.body[data[i]] = req.sanitize(req.body[data[i]]).trim();
                }

            }
        }
        if (req.params) {
            data = Object.keys(req.params);
            for (let i = 0; i < data.length; i++) {
                if (ignore.indexOf(data[i]) == -1 && typeof req.params[data[i]] == 'string') 
                    req.params[data[i]] = req.sanitize(req.params[data[i]]).trim();
                


            }
        }
        if (req.query) {
            data = Object.keys(req.query);
            for (let i = 0; i < data.length; i++) {
                if (ignore.indexOf(data[i]) == -1 && typeof req.query[data[i]] == 'string') 
                    req.query[data[i]] = req.sanitize(req.query[data[i]]).trim();
                


            }
        }
        next();
    }
};
