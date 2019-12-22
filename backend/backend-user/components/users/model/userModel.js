const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  email: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  verify: {
    type: Boolean,
    default: false,
    require: true
  },
  isTeacher: {
    type: Boolean,
    required: true
  },
  imageUrl: {
    type: String,
    require: true
  },
  local: {
    password: {
      type: String
    }
  },
  google: {
    id: {
      type: String
    }
  },
  facebook: {
    id: {
      type: String
    }
  },
  experience: {
    introduction: {
      title: {
        type: String,
        require: false
      },
      description: {
        type: String,
        require: false
      }
    },
    level: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false
      },
      title: {
        type: String,
        require: false
      }
    },
    skill: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false
      },
      title: {
        type: String,
        require: false
      }
    }],
    educationLevel: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId
      },
      title: {
        type: String,
        require: false
      }
    }],
    location: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        require: false
      },
      district: [{
        name: {
          type: String,
          require: false
        }
      }],
      city: {
        type: String,
        require: false
      }
    },
  },
  status: {
    hourRate: {
      type: Number,
      require: false
    },
    availability: {
      type: Boolean,
      require: false
    },
    isVisibility: {
      type: Boolean,
      require: false
    },
    timeCommit: {
      type: Number,
      require: false
    }
  },
  contracts: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      require: false
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      require: false
    },
    emailStudent: {
      type: String,
      require: false
    },
    nameStudent: {
      type: String,
      require: false
    },
    from: {
      type: String,
      require: false
    },
    to: {
      type: String,
      require: false
    },
    hourRate: {
      type: String,
      require: false
    },
    totalHourCommit: {
      type: String,
      require: false
    },
    review: {
      type: String,
      require: false
    },
    status: {
      type: Number,
      require: false
    },
    score: {
      type: Number,
      require: false
    }
  }],
  totalScore: {
    type: Number,
    require: false
  },
  isBlocking: {
    type: Boolean,
    require: true
  },
  contact: {
    phone: {
      type: String,
      require: false
    },
    address: {
      street: {
        type: String,
        require: false
      },
      city: {
        type: String,
        require: false
      },
      district: {
        type: String,
        require: false
      }
    }
  }
});

module.exports = mongoose.model('user', userSchema);