import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
  firstName: { type: String,  },
  lastName: { type: String,  },
  email: { type: String,  },
  adultCount: { type: Number,  },
  childCount: { type: Number,  },
  checkIn: { type: Date,  },
  checkOut: { type: Date,  },
  userId: { type: String,  },
  totalCost: { type: Number,  },
});

const hotelSchema = new mongoose.Schema({
  userId: { type: String,  },
  name: { type: String,  },
  city: { type: String,  },
  country: { type: String,  },
  description: { type: String,  },
  type:  [{type: String},  ],
  adultCount: { type: Number,  },
  childCount: { type: Number,  },
  facilities: [{ type: String,  }],
  pricePerNight: { type: Number,  },
  starRating: { type: Number, min: 1, max: 5 },
  photos: [{ type: String,  }],
  lastUpdated: { type: Date,  },
  bookings: [bookingSchema],
});

const Hotel = mongoose.model("booking", hotelSchema);
export default Hotel;
