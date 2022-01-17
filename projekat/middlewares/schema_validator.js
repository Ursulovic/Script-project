const Joi = require('joi');
const Schemas = require('../validation/app_schemas');
const Schemas_auth = require('../validation/user_schema');

module.exports = (useJoiError = false) => {



    const supportedMethods = ['post', 'put'];

    return (req, res, next) => {


        const route = '/' + req.route.path.split('/')[1];
        const method = req.method.toLowerCase();


        if (supportedMethods.includes(method) && ((route in Schemas) || (route in Schemas_auth))) {
           
            let schema = Schemas[route];
            if (!schema) {
                schema = Schemas_auth[route];
            }

            const result = schema.validate(req.body);

            if (result.error) {
                console.log(result.error);
                res.status(422).json(result.error);
            }

        }
        next();
    }

}


