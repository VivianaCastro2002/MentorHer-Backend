export const getAll = async (req, res) => {
  try {
    const mentorships = [
        {
            id: 50,
            mentor: { id: 1, name: "Dr. Elena" },
            mentee: { id: 102, name: "Ana Torres" },
            status: "active",
            start_date: "2023-10-01",
            termination_reason: null
        }
    ];
    res.status(200).json({ mentorships });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const terminate = async (req, res) => {
  try {
    const { id } = req.params;
    const { reasons, details } = req.body;

    const mentorship = {
        id,
        status: "termination_requested",
        termination_reason: reasons.join(', ') + (details ? `: ${details}` : '')
    };

    res.status(200).json({ 
        message: "Solicitud de terminación enviada.", 
        mentorship 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
