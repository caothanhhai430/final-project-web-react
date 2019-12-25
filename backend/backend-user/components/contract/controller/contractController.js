const mongoose = require('mongoose');
const ContractModel = require('../model/contractModel');
const UserModel = require('../../users/model/userModel');
const SubUserModel = require('../model/subUserModel');

exports.createContract = async (req, res, next) => {
  const {
    student,
    teacher,
    from,
    to,
    hourRate,
    totalHourCommit
  } = req.body;
  const newContract = new ContractModel({
    _id: new mongoose.Types.ObjectId(),
    student: {
      userId: student._id,
      name: student.name,
      email: student.email
    },
    teacher: {
      userId: teacher._id,
      name: teacher.name,
      email: teacher.name
    },
    from,
    to,
    status: 0,
    hourRate,
    totalHourCommit
  });

  try {
    const result = await newContract.save();
    const exStudent = await UserModel.findById(student._id);
    const exTeacher = await UserModel.findById(teacher._id);

    if (exStudent && exTeacher) {
      exStudent.contracts.push({
        _id: newContract._id,
        userContractId: teacher._id,
        emailUserContract: teacher.email,
        nameUserContract: teacher.name,
        from,
        to,
        status: 0,
        hourRate,
        totalHourCommit
      });
      exTeacher.contracts.push({
        _id: newContract._id,
        userContractId: student._id,
        emailUserContract: student.email,
        nameUserContract: student.name,
        from,
        to,
        status: 0,
        hourRate,
        totalHourCommit
      });
      await exStudent.save();
      await exTeacher.save();
    } else {
      return res.json({
        message: 'not found user',
        error: 'not found user!'
      });
    }
    if (result) {
      return res.json({
        contract: result,
        message: 'create message success'
      });
    }
    return res.json({
      error: 'create contract has failed',
      message: 'create contract has failed'
    });
  } catch (err) {
    return res.json({
      error: err,
      message: 'some thing went wrong!'
    });
  }
};

exports.updateContract = async (req, res, next) => {
  const {
    _id,
    idsub,
    review,
    score,
    status
  } = req.body;
  try {
    const contract = await ContractModel.findById(_id);
    const idTeach = contract.teacher.userId;
    const idStudent = contract.student.userId;
    const teacher = await UserModel.findById(idTeach);
    const student = await UserModel.findById(idStudent);
    if (teacher && student) {
      const updateTeacher = teacher.contracts.id(_id);
      updateTeacher.review = review;
      updateTeacher.score = score;
      updateTeacher.status = status;
      // teacher.contracts.id(_id) = updateTeacher;
      const updateStudent = student.contracts.id(_id);
      updateStudent.status = status;
      updateStudent.review = review;
      updateStudent.score = score;
      await teacher.save();
      await student.save();
    } else {
      return res.json({
        message: 'update contract has failed because user not fount'
      });
    }

    if (contract) {
      contract.status = status;
      contract.review = review;
      contract.score = score;
      await contract.save();
      return res.json({
        contract,
        message: 'update contract has success'
      });
    }
    return res.json({
      message: 'update contract has fail',
      error: 'update contract has failed'
    });
  } catch (err) {
    return res.json({
      error: err,
      message: 'update has failed!'
    });
  }
};