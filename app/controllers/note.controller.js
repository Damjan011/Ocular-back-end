const Note = require('../models/note.model.js');

exports.create = (req, res) => {
  if(!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  }

  const note = new Note({
    title: req.body.title || "Untitled Note",
    content: req.body.content
  });

  note.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "An error occured while creating a note"
    });
  });
};

exports.findAll = (req, res) => {
  Note.find()
  .then(notes => {
    res.send(notes);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "An error occured while retrieving notes"
    });
  });
};

// exports.findOne = (req, res) => {
//   Note.findById(req.params.noteId)
//   .then(note => {
//     if(!note) {
//       return res.status(404).send({
//         message: "Note with the id of " + req.params.noteId + " not found"
//       });
//     }
//     res.send(note);
//   }).catch(err => {
//     if(err.kind === 'ObjectId') {
//       return res.status(404).send({
//         message: "Note with the id of " + req.params.noteId + " not found"
//       });
//     }
//     return res.status(500).send({
//       message: "Error retrieving note with the id of " + req.params.noteId
//     });
//   });
// };

exports.update = (req, res) => {
  if(!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  }

  Note.findByIdAndUpdate(req.params.noteId, {
    title: req.body.title || "Untitled Note",
    content: req.body.content
  }, {new: true})
  .then(note => {
    if(!note) {
      return res.status(404).send({
        message: "Note with the id of " + req.params.noteId + " not found"
      })
    }
    res.send(note);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Note with the id of " + req.params.noteId + " not found"
      });
    }
    return res.status(500).send({
      message: "Error updating note with the id of " + req.params.noteId
    })
  })
};

exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
  .then(note => {
    if(!note) {
      return res.status(404).send({
        message: "Note with the id of " + req.params.noteId + " not found"
      });
    }
    res.send({message: "Note deleted successfully!"});
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "Note with the id of " + req.params.noteId + " not found"
      });
    }
    return res.status(500).send({
      message: "Could not delete note with the id of " + req.params.noteId
    });
  });
};