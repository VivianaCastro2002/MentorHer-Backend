export const getUsers = async (req, res) => {
  try {
    const { role } = req.query;
    // Check if user is admin (middleware should handle this or check here)
    // if (req.user.role !== 'admin') return res.status(403)...

    const users = [
        {
            id: 101,
            name: "Ana Torres",
            role: role || "mentee",
            // ... stats
        }
    ];
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateMentorCapacity = async (req, res) => {
  try {
    const { id } = req.params;
    const { max_mentees } = req.body;

    res.status(200).json({ message: "Capacidad actualizada." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getSupportTickets = async (req, res) => {
  try {
    const tickets = [
        {
            id: 1,
            subject: "Login issue",
            message: "Cannot login",
            status: "open"
        }
    ];
    res.status(200).json({ tickets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateSupportTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    res.status(200).json({ message: "Ticket updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
