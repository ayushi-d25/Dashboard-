export class CustomErrorHandler {
    constructor(message){
        this.message = message
    }
}

export class ValidationError extends CustomErrorHandler {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.status = 422; 
  }
}

export class NotFoundError extends CustomErrorHandler {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
  }
}

export class UnauthorizedError extends CustomErrorHandler {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.status = 401;
  }
}

export class BadRequest extends CustomErrorHandler { 
    constructor(message){
        super(message)
        this.name = "Bad Request",
        this.status = 400
    }
}

export class ForbiddenRequestError extends CustomErrorHandler { 
    constructor(message){
        super(message)
        this.name = "Bad Request",
        this.status = 400
    }
}

export class DatabaseConnectionError extends CustomErrorHandler { 
    constructor(message){
        super(message)
        this.name = "Database Connection Error",
        this.status = 502
    }
}

export class ConflictError extends CustomErrorHandler { 
    constructor(message){
        super(message)
        this.name = "Conflict Error",
        this.status = 409
    }
}
