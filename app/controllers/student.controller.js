const Student = require("../models/student.model");

exports.create = (req, res) => {
  const student = new Student({
    name: req.body.name || "Untitled",
    age: req.body.age,
    major: req.body.major,
  });
  student
    .save()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: "Something went wrong!!",
        error: err,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Student.findByIdAndUpdate(
    id,
    {
      name: req.body.name || "Untitled",
      age: req.body.age,
      major: req.body.major,
      updatedDate: Date.now(),
    },
    { new: true }
  )
    .then((student) => {
      res.send(student);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Something went wrong!!",
        error: err,
      });
    });
};

exports.findAll = (req, res) => {
  Student.find()
    .then((students) => {
      res.send(students);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Something went wrong!!",
        error: err,
      });
    });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
    Student.findById(id)
      .then((student) => {
        if (!student) {
          return res.status(400).send({
            message: "Student not available!",
          });
        }
        res.send(student);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Something went wrong!",
          error: err,
        });
      });
  };
  

exports.delete = (req, res) => {
  const id = req.params.id;
  Student.findByIdAndRemove(id)
    .then(() => {
      res.send({
        message: "Removed Succesfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Something went wrong!!",
        error: err,
      });
    });
};
