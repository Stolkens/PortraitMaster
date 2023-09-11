const Photo = require('../models/photo.model');
const Voter = require('../models/Voter.model')
const sanitize = require('mongo-sanitize');
const requestIp = require('request-ip');

/****** SUBMIT PHOTO ********/

exports.add = async (req, res) => {
  try {
    const { title, author, email } = req.fields;
    const file = req.files.file;

    if (title && author && email && file) { // if fields are not empty...
      const fileName = file.path.split('/').slice(-1)[0]; // cut only filename from full path, e.g. C:/test/abc.jpg -> abc.jpg
      const fileExt = fileName.split('.').slice(-1)[0];

      // Walidacja znaków HTML
      const sanitizedTitle = sanitize(title);
      const sanitizedAuthor = sanitize(author);

      const validationRules = [
        {
          field: 'title',
          value: sanitizedTitle,
          maxLength: 25,
        },
        {
          field: 'author',
          value: sanitizedAuthor,
          maxLength: 50,
        },
        {
          field: 'email',
          value: email,
        },
      ];

      // Sprawdź warunki walidacji
      for (const rule of validationRules) {
        if (rule.value.length > rule.maxLength) {
          throw new Error(`${rule.field} is too long. Maximum length is ${rule.maxLength} characters.`);
        }
      }
    

      const pattern = new RegExp(
        /(<\s*(strong|em)*>(([A-z]|\s)*)<\s*\/\s*(strong|em)>)|(([A-z]|\s|\.)*)/,
        "g"
      );
      const titleMatched = title.match(pattern).join('');
      const authorMatched = author.match(pattern).join('');
      if(titleMatched.length < title.length || authorMatched.length < author.length) throw new Error('Invalid characters...');
  
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        console.log('zly email')
        throw new Error('Invalid email');
      }

      if (fileExt === "jpg" || fileExt === "jpeg" || fileExt === "png") {
        const newPhoto = new Photo({
          title: sanitizedTitle,
          author: sanitizedAuthor,
          email,
          src: fileName,
          votes: 0,
        });
        await newPhoto.save(); // ...save new photo in DB
        res.json(newPhoto);
      } else {
        throw new Error('Wrong input!');
      }
    } else {
      throw new Error('Incomplete input!');
    }
  } catch(err) {
    res.status(500).json(err);
  }
};

/****** LOAD ALL PHOTOS ********/

exports.loadAll = async (req, res) => {

  try {
    res.json(await Photo.find());
  } catch(err) {
    res.status(500).json(err);
  }

};

/****** VOTE FOR PHOTO ********/

exports.vote = async (req, res) => {

  try {
    
    const clientIp = requestIp.getClientIp(req); 
    console.log('cientIp', clientIp);
    const photoToUpdate = await Photo.findOne({ _id: req.params.id });
    // check if user with this IP exist
    const userVote = await Voter.findOne({ user: clientIp });
    console.log('photoToUpdate',photoToUpdate);
    console.log('userVote', userVote);

    
    if(!photoToUpdate) res.status(404).json({ message: 'Not found' });
  
    if (userVote) {
      if (userVote.votes.includes(photoToUpdate._id)) {
        res.status(500).json({
          message: "This photo has already been voted on from this ip address",
        });
      } else {
        userVote.votes.push(photoToUpdate._id);
        await userVote.save();
        photoToUpdate.votes++;
        await photoToUpdate.save();

        res.send({ message: "OK" });
      }
    } else {
      const newVoter = new Voter({
        user: clientIp,
        votes: [photoToUpdate._id],
      });
      await newVoter.save();
      photoToUpdate.votes++;
  
      await photoToUpdate.save();

      res.send({ message: "OK" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};