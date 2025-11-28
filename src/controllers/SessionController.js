import multer from 'multer';
const upload = multer({ dest: 'uploads/' }); // Configure storage as needed

export const getByMentorshipId = async (req, res) => {
  try {
    const { id } = req.params; // Mentorship ID
    const sessions = [
        {
            id: 201,
            mentorship_id: id,
            session_number: 1,
            date: "2023-11-15",
            time: "14:00",
            duration: 60,
            status: "confirmed",
            topic: "Revisión de CV",
            mentee_goals: "Mejorar resumen",
            rating: 5,
            feedback: "Excelente sesión",
            mentor_survey: { preparation: "excellent", outcome: "Good" },
            attachments: [ { name: "cv.pdf", url: "..." } ]
        }
    ];
    res.status(200).json({ sessions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const create = async (req, res) => {
  try {
    const { id } = req.params; // Mentorship ID
    const { date, time, topic, mentee_goals } = req.body;

    const session = {
        id: Math.floor(Math.random() * 1000),
        mentorship_id: id,
        date,
        time,
        topic,
        mentee_goals,
        status: "pending"
    };

    res.status(201).json({ session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params; // Session ID
    const updates = req.body;

    const session = {
        id,
        ...updates
    };

    res.status(200).json({ session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const uploadAttachment = [
  upload.single('file'),
  async (req, res) => {
    try {
      const { id } = req.params; // Session ID
      const file = req.file;

      if (!file) {
          return res.status(400).json({ error: "No file uploaded" });
      }

      // Upload to Supabase Storage or other storage here
      // const { data, error } = await supabase.storage.from('attachments').upload(...)

      const attachment = {
          name: file.originalname,
          url: "https://storage.example.com/" + file.filename
      };

      res.status(201).json({ attachment });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
];
