const jwt       = require('jsonwebtoken');
const secretKey = "Hypolite_Est_Un_Chien_Qui_Mange_Trop!";


// ===================================================
// 
// ===================================================
module.exports = (req, res, next) => 
{
    try 
    {
        console.log(req.headers.authorization);
        const token         = req.headers.authorization.split(' ')[1];
        const decodedToken  = jwt.verify(token, secretKey);
        const userId        = decodedToken.userId;

        if (req.body.userId && req.body.userId !== userId) 
        {
            throw 'Invalid user ID';
        }
        else
        {
            console.log("User identified : " + userId);
            next();
        }
    } 
    catch 
    {
        res.status(401).json({error: new Error('Invalid request!')});
    }
};