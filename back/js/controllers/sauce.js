const Sauce = require('../models/sauce');

// ===================================================
// addSauce
// ===================================================
exports.addSauce = (req, res, next) => 
{
    console.log("addSauce");

    if (!req.body.sauce || !req.file.path) 
    {
        return res.status(400).json({ message: 'Creating sauce error !'});
    }

    const sauce         = new Sauce(JSON.parse(req.body.sauce));
    sauce.imageUrl      = req.file.path;
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
    console.log("getSauce");
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

    if (!req.file)
    {
        // Use Json
        sauce = new Sauce({...req.body});
    }
    else
    {
        sauce           = new Sauce(JSON.parse(req.body.sauce));
        sauce.imageUrl  = req.file.path;
    }

    sauce._id = req.params.id;

    Sauce.updateOne({ _id: req.params.id }, sauce)
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
}

// ===================================================
// deleteSauce
// ===================================================
exports.deleteSauce = (req, res, next) => 
{
    return res.status(400).json({ message: 'Deleting sauce error !'});
}

// ===================================================
// likeSauce
// ===================================================
exports.likeSauce = (req, res, next) => 
{
    console.log(req.body);
    console.log(req.params);
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => 
        {
            if (!sauce)
            {
                return res.status(401).json({ error: 'Sauce not found !' });
            }

            if (req.body.like > 0)
            {
                // Check if user have alredy liked ->then
                sauce.likes += 1;
                sauce.usersLiked.push(req.body.userId);
            }
            else if (req.body.like < 0)
            {
                // Check if user have alredy disliked ->then
                sauce.dislikes += 1;
                sauce.usersDisliked.push(req.body.userId);
            }
            else
            {
                // Check if user have alredy liked / disliked ->then
                sauce.likes <= 0 ? sauce.likes = 0 : sauce.likes -= 1;
                sauce.dislikes <= 0 ? sauce.dislikes = 0 : sauce.dislikes -= 1;

                for( var i = 0; i < sauce.usersLiked; i++)
                { 
                    if ( sauce.usersLiked[i] === req.body.userId) 
                    { 
                        sauce.usersLiked.splice(i, 1); 
                        break;
                    }
                }

                for( var i = 0; i < sauce.usersDisliked; i++)
                { 
                    if ( sauce.usersDisliked[i] === req.body.userId) 
                    { 
                        sauce.usersDisliked.splice(i, 1); 
                        break;
                    }
                }
            }

            console.log(sauce);

            // Update
            Sauce.updateOne({ _id: req.params.id }, sauce)
                .then(() => res.status(200).json({ message: 'Like sauce done !'}))
                .catch(error => res.status(400).json({ error }));
        })
    .catch(error => res.status(404).json({ error }));
}
