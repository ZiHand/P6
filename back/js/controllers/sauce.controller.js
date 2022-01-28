const Sauce = require('../models/sauce.model');
const fs    = require("fs");

// ===================================================
// deleteImage // put async
// ===================================================
async function deleteImage(url)
{
    let indexOf = url.lastIndexOf("/") + 1;
    let file    = __dirname + "/../../images/" + url.substring(indexOf, url.length);
    
    try 
    {
        fs.unlinkSync(file);
    } 
    catch (error) 
    {
        console.log("Unable to delete : " + file);
    }
    
}

// ===================================================
// addSauce
// ===================================================
exports.addSauce = (req, res, next) => 
{
    if (!req.body.sauce || !req.file.path) 
    {
        return res.status(400).json({ message: 'Creating sauce error !'});
    }

    const sauce         = new Sauce(JSON.parse(req.body.sauce));
    sauce.imageUrl      = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    sauce.likes         = 0;
    sauce.dislikes      = 0;
    sauce.usersLiked    = [];
    sauce.usersDisliked = [];

    // Register to DB
    sauce.save()
        .then(() => {res.status(201).json({ message: 'Sauce added !'});})
        .catch(error => {res.status(400).json({ error })});
}

// ===================================================
// getSauces
// ===================================================
exports.getSauces = (req, res, next) => 
{
    Sauce.find()
        .then(sauces => {res.status(200).json(sauces)})
        .catch(error => res.status(400).json({ error }));
}

// ===================================================
// getSauce
// ===================================================
exports.getSauce = (req, res, next) => 
{
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}

// ===================================================
// updateSauce
// ===================================================
exports.updateSauce = (req, res, next) => 
{
    let badStatus   = 404;
    let errorMsg    = "Sauce not found !";

    // Find Sauce in db
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => 
        {
            if (sauce)
            {
                let reqSauce = null;

                if (!req.file)
                {
                    if (req.body.userId !== sauce.userId)
                    {
                        badStatus = 403;
                        errorMsg = " unauthorized request";
                        throw(errorMsg);
                    }

                    // Use Json
                    reqSauce               = new Sauce({...req.body});
                    reqSauce.usersLiked    = sauce.usersLiked;
                    reqSauce.usersDisliked = sauce.usersDisliked;
                    reqSauce.likes         = sauce.likes;
                    reqSauce.dislikes      = sauce.dislikes;
                }
                else
                {
                    if (JSON.parse(req.body.sauce).userId !== sauce.userId)
                    {
                        badStatus = 403;
                        errorMsg = "unauthorized request";
                        throw(errorMsg);
                    }

                    reqSauce               = new Sauce(JSON.parse(req.body.sauce));
                    reqSauce.imageUrl      = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                    reqSauce.usersLiked    = sauce.usersLiked;
                    reqSauce.usersDisliked = sauce.usersDisliked;
                    reqSauce.likes         = sauce.likes;
                    reqSauce.dislikes      = sauce.dislikes;

                    // should remove old image ?
                    deleteImage(sauce.imageUrl);
                }

                reqSauce._id = sauce._id;

                return reqSauce;
            }
            else
            {
                return null;
            }            
        })
        .then(sauce =>
        {
            Sauce.updateOne({ _id: req.params.id }, sauce)
                .then(() => res.status(200).json({ message: 'Sauce modified !'}))
                .catch(error => res.status(400).json({ message: 'Sauce modification FAILED !' }));
        })
        .catch(error => res.status(badStatus).json({ message: errorMsg }));
}

// ===================================================
// deleteSauce
// ===================================================
exports.deleteSauce = (req, res, next) => 
{
    // find sauce image
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => 
        {
            if (sauce)
            {
                deleteImage(sauce.imageUrl);
            }
        })
        .catch(error => res.status(400).json({ error }));


    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce deleted !'}))
        .catch(error => res.status(400).json({ error }));
}

// ===================================================
// likeSauce
// ===================================================
exports.likeSauce = (req, res, next) => 
{
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => 
        {
            if (!sauce)
            {
                return res.status(404).json({ error: 'Sauce not found !' });
            }

            let shouldUpdate = false;

            if (req.body.like > 0)
            {
                // Check if user have alredy liked ->then
                if (!sauce.usersLiked.find(element => element === req.body.userId))
                {
                    sauce.usersLiked.push(req.body.userId);
                    shouldUpdate = true;
                }
            }
            else if (req.body.like < 0)
            {
                // Check if user have alredy disliked ->then
                if (!sauce.usersDisliked.find(element => element === req.body.userId))
                {
                    
                    sauce.usersDisliked.push(req.body.userId);
                    shouldUpdate = true;
                }
            }
            else
            {
                
                // Check if user have alredy liked / disliked ->then
                for(var i = 0; i < sauce.usersLiked.length; i++)
                {
                    if (sauce.usersLiked[i] === req.body.userId) 
                    { 
                        sauce.usersLiked.splice(i, 1);
                        shouldUpdate = true;
                        break;
                    }
                }

                for( var i = 0; i < sauce.usersDisliked.length; i++)
                { 
                    if ( sauce.usersDisliked[i] === req.body.userId) 
                    { 
                        sauce.usersDisliked.splice(i, 1);
                        shouldUpdate = true;
                        break;
                    }
                }
            }

            sauce.likes     = sauce.usersLiked.length;
            sauce.dislikes  = sauce.usersDisliked.length;

            // Update
            if (shouldUpdate)
            {
                console.log(sauce);
                Sauce.updateOne({ _id: req.params.id }, sauce)
                    .then(() => res.status(200).json({ message: 'Like / dislike sauce done !'}))
                    .catch(error => res.status(400).json({ message: 'Like / dislike sauce FAILED !' }));
            }
            else
            {
                throw("Unable to change likes / unlikes");
            }            
        })
    .catch(error => res.status(401).json({ error }));
}
