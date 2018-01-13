import { RequestHandler } from "express";

userNameHandler = (request, response, next) => {
    if (response.locals.boards.length > 0) {
        response.status(400).end("This user name is already taken.");
    }
};

function getUserObjectValidHandler(allowedFields) {
    return (request, response, next) => {
        for (key in request.body) {
            var val = request.body[key];
            
            if (allowedFields.indexOf(key) == -1) {
                response.status(400).end("Illegal parameter");
                return;
            }
            
            switch (key) {
                case "name":
                    if (!(val typeof String)) {
                        response.status(400).end("Invalid user name given");
                        return;
                    }
                    continue;
                case "age":
                    if (!(val typeof Number)) {
                        response.status(400).end("Invalid age given");
                        return;
                    }
                    continue;
                case "password":
                    if (!(val typeof String)) {
                        response.status(400).end("Invalid password given");
                        return;
                    }
                    continue;
                default:
                    response.status(400).end("Illegal user property given");
                    return;
            }
        }
        
        next();
    };
}

paramIdMatchLoginHandler = (request, response, next) => {
    if (request.params.id == response.locals.boards[0]._id) {
        next();
    } else {
        esponse.status(403).end("Cannot access another user than yourself!");
    }
}

offsetLimitHandler = (request, response, next) => {
    if (!(request.params.offset && request.params.offset typeof Number && request.params.limit && request.params.limit typeof Number)) {
        response.status(400).end("Do the pagination thing");
    }
    else { next() }
}

export prepareOperation = (operation) => {
    switch (operation.schema) {
        case "user-name-not-taken":
            return userNameHandler;
        case "user-object-valid":
            return getUserObjectValidHandler(operation.allowedFields);
        case "offset-and-limit-given":
            return offsetLimitHandler;
        case "param-id-match-login":
            return paramIdMatchLoginHandler;
    }
};
