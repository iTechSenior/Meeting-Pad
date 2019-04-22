const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const { dates } = require('../helpers');

const DocumentSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required!']
  },
  summary: {
    type: String,
    required: [true, 'Document summary is required!']
  },
  minutesOfMeeting: {
    type: String
  },
  filename: {
    type: String,
    required: [true, 'Filename is required!'],
    unique: [true, 'Filename already exist!']
  },
  path: {
    type: String,
    required: [true, 'Path is required!']
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  unitID: {
    type: Schema.Types.ObjectId,
    ref: 'Unit'
  },
  status: {
    type: String,
    enum: ['pending', 'info', 'approved', 'rejected'], // pending is new
    default: 'pending'
  }
}, {
    timestamps: true
  });

DocumentSchema.plugin(uniqueValidator, {
  message: ({ path, value }) => {
    if (path == 'name') return 'UserRole already exists.'
  }
});

DocumentSchema.query.getDocumentsGlobal = async function (type, count) {
  switch (type) {
    case 'approved':
      if (count) {
        let sum = await this.find({ status: 'approved' }).countDocuments().lean().exec();
        return sum;
      } else {
        let approveds = await this.find({ status: 'approved' }).populate('userID', '_id email').populate('unitID', '-_id name').lean().exec();
        return approveds;
      }
      break;
    case 'rejected':
      if (count) {
        let sum = await this.where({ status: 'rejected' }).countDocuments().lean().exec();
        return sum;
      } else {
        let rejecteds = await this.where({ status: 'rejected' }).populate('userID', '_id email').populate('unitID', '-_id name').lean().exec();
        return rejecteds;
      }
      break;
    case 'pending':
      if (count) {
        let sum = await this.where({ status: 'pending' }).countDocuments().lean().exec();
        return sum;
      } else {
        let pendings = this.where({ status: 'pending' }).populate('userID', '_id email').populate('unitID', '-_id name').lean().exec();
        return pendings;
      }
      break;
    case 'info':
      if (count) {
        let sum = await this.where({ status: 'info' }).countDocuments().lean().exec();
        return sum;
      } else {
        let infos = this.where({ status: 'info' }).populate('userID', '_id email').populate('unitID', '-_id name').lean().exec();
        return infos;
      }
      break;
  }
}

DocumentSchema.query.getDocumentsByUnitCount = async function (unitID) {
  const approved = await this.where({ unitID, status: 'approved' }).countDocuments().lean().exec();
  const rejected = await this.where({ unitID, status: 'rejected' }).countDocuments().lean().exec();
  return {
    approved, rejected
  }
}

DocumentSchema.query.getDocumentsByUnitForCurrentMonth = async function (unitID) {
  const today = new Date();
  const startDay = today.setDate(1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const approved = await this.where({ unitID, status: 'approved', createdAt: { $gte: startDay, $lte: lastDay } }).countDocuments().lean().exec();
  const rejected = await this.where({ unitID, status: 'rejected', createdAt: { $gte: startDay, $lte: lastDay } }).countDocuments().lean().exec();
  return {
    approved, rejected
  };
}

DocumentSchema.query.getDocumentsByUnitPerMonthForYear = async function (unitID, status) {
  // const today = new Date();
  // const startDay = today.setDate(1);
  // const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  // const dates = {
  //   january: {
  //     startDay: new Date(today.getFullYear(), 0, 1),
  //     lastDay: new Date(today.getFullYear(), 1, 0, 23, 59, 59, 23, 59, 59)
  //   },
  //   february: {
  //     startDay: new Date(today.getFullYear(), 1, 1),
  //     lastDay: new Date(today.getFullYear(), 2, 0, 23, 59, 59)
  //   }, 
  //   march: {
  //     startDay: new Date(today.getFullYear(), 2, 1),
  //     lastDay: new Date(today.getFullYear(), 3, 0, 23, 59, 59)
  //   }, 
  //   april: {
  //     startDay: new Date(today.getFullYear(), 3, 1),
  //     lastDay: new Date(today.getFullYear(), 4, 0, 23, 59, 59)
  //   }, 
  //   may: {
  //     startDay: new Date(today.getFullYear(), 4, 1),
  //     lastDay: new Date(today.getFullYear(), 5, 0, 23, 59, 59)
  //   },
  //   june: {
  //     startDay: new Date(today.getFullYear(), 5, 1),
  //     lastDay: new Date(today.getFullYear(), 6, 0, 23, 59, 59)
  //   },
  //   july: {
  //     startDay: new Date(today.getFullYear(), 6, 1),
  //     lastDay: new Date(today.getFullYear(), 7, 0, 23, 59, 59)
  //   }, 
  //   august: {
  //     startDay: new Date(today.getFullYear(), 7, 1),
  //     lastDay: new Date(today.getFullYear(), 8, 0, 23, 59, 59)
  //   }, 
  //   september: {
  //     startDay: new Date(today.getFullYear(), 8, 1),
  //     lastDay: new Date(today.getFullYear(), 9, 0, 23, 59, 59)
  //   }, 
  //   october: {
  //     startDay: new Date(today.getFullYear(), 9, 1),
  //     lastDay: new Date(today.getFullYear(), 10, 0, 23, 59, 59)
  //   }, 
  //   november: {
  //     startDay: new Date(today.getFullYear(), 10, 1),
  //     lastDay: new Date(today.getFullYear(), 11, 0, 23, 59, 59)
  //   }, 
  //   december: {
  //     startDay: new Date(today.getFullYear(), 11, 1),
  //     lastDay: new Date(today.getFullYear(), 11, 31, 23, 59, 59)
  //   }
  // }
  const [january, february, march, april, may, june, july, august, september, october, november, december] = await Promise.all([
    this.where({ unitID, status, createdAt: { $gte: dates.january.startDay, $lte: dates.january.lastDay } }).countDocuments().lean().exec(),
    this.where({ unitID, status, createdAt: { $gte: dates.february.startDay, $lte: dates.february.lastDay } }).countDocuments().lean().exec(),
    this.where({ unitID, status, createdAt: { $gte: dates.march.startDay, $lte: dates.march.lastDay } }).countDocuments().lean().exec(),
    this.where({ unitID, status, createdAt: { $gte: dates.april.startDay, $lte: dates.april.lastDay } }).countDocuments().lean().exec(),
    this.where({ unitID, status, createdAt: { $gte: dates.may.startDay, $lte: dates.may.lastDay } }).countDocuments().lean().exec(),
    this.where({ unitID, status, createdAt: { $gte: dates.june.startDay, $lte: dates.june.lastDay } }).countDocuments().lean().exec(),
    this.where({ unitID, status, createdAt: { $gte: dates.july.startDay, $lte: dates.july.lastDay } }).countDocuments().lean().exec(),
    this.where({ unitID, status, createdAt: { $gte: dates.august.startDay, $lte: dates.august.lastDay } }).countDocuments().lean().exec(),
    this.where({ unitID, status, createdAt: { $gte: dates.september.startDay, $lte: dates.september.lastDay } }).countDocuments().lean().exec(),
    this.where({ unitID, status, createdAt: { $gte: dates.october.startDay, $lte: dates.october.lastDay } }).countDocuments().lean().exec(),
    this.where({ unitID, status, createdAt: { $gte: dates.november.startDay, $lte: dates.november.lastDay } }).countDocuments().lean().exec(),
    this.where({ unitID, status, createdAt: { $gte: dates.december.startDay, $lte: dates.december.lastDay } }).countDocuments().lean().exec()
  ]);
  // const pending = await this.where({ unitID, status: 'pending', createdAt: { $gte: startDay, $lte: lastDay } }).countDocuments();
  // const info = await this.where({ unitID, status: 'info', createdAt: { $gte: startDay, $lte: lastDay } }).countDocuments();
  return {
    january, february, march, april, may, june, july, august, september, october, november, december
  };
}

module.exports = mongoose.model('Document', DocumentSchema);