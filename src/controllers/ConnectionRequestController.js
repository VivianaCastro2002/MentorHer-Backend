export const getAll = async (req, res) => {
  try {
    const requests = [
        {
            id: 1001,
            mentor_id: 1,
            mentee_id: 102,
            status: "pending",
            motivation_letter: "string",
            created_at: new Date().toISOString()
        }
    ];
    res.status(200).json({ requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const create = async (req, res) => {
  try {
    const { mentor_id, motivation_letter } = req.body;
    
    const request = {
        id: Math.floor(Math.random() * 1000),
        mentor_id,
        mentee_id: req.user.id, // From auth middleware
        status: "pending",
        motivation_letter,
        created_at: new Date().toISOString()
    };

    res.status(201).json({ request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // accepted | declined

    // Logic to update status
    // If accepted, create mentorship

    const request = {
        id,
        status,
        updated_at: new Date().toISOString()
    };

    res.status(200).json({ request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
