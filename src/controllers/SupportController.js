export const createTicket = async (req, res) => {
  try {
    const { subject, message } = req.body;
    
    // Create ticket in DB
    
    res.status(201).json({ message: "Ticket created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
