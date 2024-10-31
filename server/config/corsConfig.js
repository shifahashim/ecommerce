const whitelist = ["http://localhost:5000/", "http://127.0.0.1:5000/","http://localhost:5173",
"http://127.0.0.1:5173" ];

 const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports =corsOptions;