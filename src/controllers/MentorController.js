export const getAll = async (req, res) => {
  try {
    const { search, category } = req.query;
    // Filter logic here
    
    const mentors = [
        {
            id: 1,
            name: "Dr. Elena",
            role: "mentor",
            expertise: ["Data Science"],
            rating: 4.9,
            mentoringTopics: ["Carrera", "Técnico"]
        }
    ];

    res.status(200).json({ mentors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Fetch mentor by ID
    if (id === '999') { // Mock not found
        return res.status(404).json({ error: "Mentora no encontrada" });
    }

    const mentor = {
        id: id,
        name: "Dr. Elena",
        role: "mentor",
        expertise: ["Data Science"],
        rating: 4.9,
        mentoringTopics: ["Carrera", "Técnico"],
        bio: "Expert in AI",
        company: "AI Corp",
        title: "Senior Researcher"
    };

    res.status(200).json({ mentor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
