exports.ForKeshavSoftRedirectToLogin = (req, res, next) => {
    if (("KeshavSoft" in req) === false) {
        req.KeshavSoft = { Headers: {} };
    };

    req.KeshavSoft.DataPk = 1018;

    next();
};
