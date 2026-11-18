const success = (res, message = "Request successful", data, statusCode = 200, meta) => {
    const response = {
        status: 'success',
        success: true,
        message,
        data: data || null
    };
    if (meta && meta.page && meta.limit && meta.total) {
        response.meta = {
            page: meta.page,
            limit: meta.limit,
            total: meta.total,
            totalPages: meta.totalPages || Math.ceil(meta.total / meta.limit)
        };
    }
    return res.status(statusCode).json(response);
};

const error = (res, message = "Internal server error", data) => {
    return res.status(500).json({
        status: 'error',
        success: false,
        message: data.message || message,
        data: data.stack || null
    });
};

const notFound = (res, data, message = "Resource not found") => {
    return res.status(404).json({
        status: 'error',
        success: false,
        message,
        data: data || null
    });
}

const conflict = (res, data, message = "Conflict occurred") => {
    return res.status(409).json({
        status: 'error',
        success: false,
        message,
        data: data || null
    });
}

const badRequest = (res, data, message = "Bad request", statusCode) => {
    return res.status(statusCode || 400).json({
        status: 'error',
        success: false,
        message,
        data: data || null
    });
}

const unauthorized = (res, data, message = "Unauthorized access") => {
    return res.status(401).json({
        status: 'error',
        success: false,
        message,
        data: data || null
    });
}

const forbidden = (res, data, message = "Forbidden access") => {
    return res.status(403).json({
        status: 'error',
        success: false,
        message,
        data: data || null
    });
}

module.exports = {
    success,
    error,
    notFound,
    unauthorized,
    forbidden,
    conflict,
    badRequest
};