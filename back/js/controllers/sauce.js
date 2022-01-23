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
        .then(() =>
        {
            res.status(201).json({ message: 'Sauce added !'});
        })
        .catch(error =>
        {
            console.log("Save error : " + error);
            res.status(400).json({ error }) // ?? or message ?
        });
}

// ===================================================
// getSauces
// ===================================================
exports.getSauces = (req, res, next) => 
{
    console.log("getSauce");
    Sauce.find()
    .then(things => 
    {
        res.status(200).json(things)
    })
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
    console.log(req.params.id);
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
    console.log(sauce);

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
    return res.status(400).json({ message: 'Like sauce error !'});
}
