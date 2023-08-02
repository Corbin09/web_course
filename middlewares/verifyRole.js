const verifyRole = (role) => (req, res, next) => {
    const roleUser = req.role;
    
    if(roleUser.find((r) => +r == +role)){
        next();
    } else {
        return res.sendStatus(403);
    }
}

module.exports = verifyRole;