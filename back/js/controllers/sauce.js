const Sauce = require('../models/sauce');

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
    sauce.usersLiked    = 0;
    sauce.usersDisliked = 0;

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
    let sauce = null;

    //console.log(req.body);

    if (!req.file)
    {
        // Use Json
        sauce = new Sauce({...req.body});
    }
    else
    {
        sauce           = new Sauce(JSON.parse(req.body.sauce));
        sauce.imageUrl  = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }

    sauce._id = req.params.id;

    Sauce.updateOne({ _id: req.params.id }, sauce)
        .then(() => res.status(200).json({ message: 'Sauce modified !'}))
        .catch(error => res.status(400).json({ error }));
}

// ===================================================
// deleteSauce
// ===================================================
exports.deleteSauce = (req, res, next) => 
{
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
                    console.log("userId " + req.body.userId + " liked.");
                    sauce.usersLiked.push(req.body.userId);
                    shouldUpdate = true;
                }
            }
            else if (req.body.like < 0)
            {
                // Check if user have alredy disliked ->then
                if (!sauce.usersDisliked.find(element => element === req.body.userId))
                {
                    console.log("userId " + req.body.userId + " disliked.");
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
                        console.log("userId " + req.body.userId + " like reset.");
                        sauce.usersLiked.splice(i, 1);
                        shouldUpdate = true;
                        break;
                    }
                }

                for( var i = 0; i < sauce.usersDisliked.length; i++)
                { 
                    console.log("userId " + req.body.userId + " dislike reset.");
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
                console.log("userId " + req.body.userId + " updating sauce.");
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
