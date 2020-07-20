const record = require("../models/patient-record_schema");

async function getdatas(doctor_id) {
  let getcasetotal = new Promise(async (resolve, reject) => {
    const totalcases = await record.aggregate([
      {
        $match: {
          "complaint_history.doctor_id": doctor_id,
        },
      },
      {
        $project: {
          complaint_history: {
            $filter: {
              input: "$complaint_history",
              as: "name",
              cond: {
                $eq: ["$$name.doctor_id", doctor_id],
              },
            },
          },
        },
      },
      {
        $unwind: {
          path: "$complaint_history",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $count: "totalcases",
      },
    ]);
    if (totalcases) {
      resolve({ totalcases: totalcases });
    } else {
      reject("error");
    }
  });

  let getmedicinecount = new Promise(async (resolve, reject) => {
    const medicinecount = await record.aggregate([
      {
        $match: {
          "complaint_history.doctor_id": doctor_id,
        },
      },
      {
        $project: {
          complaint_history: {
            $filter: {
              input: "$complaint_history",
              as: "name",
              cond: {
                $eq: ["$$name.doctor_id", doctor_id],
              },
            },
          },
        },
      },
      {
        $project: {
          "complaint_history.medication.medicine_name": 1,
        },
      },
      {
        $unwind: {
          path: "$complaint_history",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $unwind: {
          path: "$complaint_history.medication",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $unwind: {
          path: "$complaint_history.medication.medicine_name",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: "$complaint_history.medication.medicine_name",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);
    if (medicinecount) {
      resolve({ medicine_history: medicinecount });
    } else {
      reject("error");
    }
  });
  let quotefetcher = new Promise((resolve, reject) => {
    resolve({ quote: quotes[Math.floor(Math.random() * 20) + 1] });
  });
  return Promise.all([getcasetotal, getmedicinecount, quotefetcher]);
}

const quotes = [
  "You’re such a wonderful doctor and you always make me feel so safe. Thank you for being the best doctor for me.",
  "Thank you so much for all your hard work and support during this difficult time. Your humility, kindness and strength are greatly appreciated.",
  "To me, you’re a magician, a great physician, a special gift from God. Thank you so much for all your contribution and efforts that you do to keep us well.",
  "I really admire all your dedication towards your work. Thanks for being an amazing doctor.",
  "I can never thank you enough for all your services. You are truly a man of honor and word. I will always pray to God for your betterment.",
  "Doctor, thank you so much for not giving up on me even though I did. May God bless you.",
  "May my baby get a great human heart like you and save the world like you are doing. Thank you for the safe delivery. Thank you so much doctor for your great service.",
  "Sending my gratefulness to the best doctor I’ve ever seen. You’ve given me a new life. Thank you for your excellent treatment and also grateful for your friendly staff members.",
  "You are not only a good doctor but also a great human. Thank you so much for your treatment.",
  "Thank you for being the hope and making everything alright in the end. May God always bless you, doctor. I appreciate your dedication for work.",
  "I truly admire the doctor and the person you are. Thank you for your brilliant treatment.",
  "Sending you our heartfelt thankfulness for caring and comforting. Your presence holds a positive vibe that is more powerful than your prescribed medicines.",
  "Thank you so much for your treatment and your consultations. I’m forever grateful to you.",
  "You’ve been such a kind and caring doctor for me during my time of need. Thank you for doing everything that you do and helping me during a hard time.",
  "I appreciate you for taking your time out and engaging with your patients. Thank you, doctor.",
  "You have my deepest respect doctor. Thank you so much for your wonderful service.",
  "Your wonderful treatment and loving care have shown results doc. You deserve my heartfelt thanks. May the Lord shower His blessings!",
  "Being in a hospital is a terrible experience, but you made me feel like home. Your caring and extra effort to make your patient comfortable is truly remarkable. Thank you, Doctor!",
  "Thank you so much for doing a great job for us. You’ve always been successful to keep our spirits up and maintaining good health.",
  "Countless thanks to the entire doctor’s who are working day and night for keeping us safe. Wishing them heartiest gratitude for their greatest contribution.",
];

module.exports = { getdatas };
