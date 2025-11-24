import supabase from '../config/SupabaseConfig.js';

export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    // Fetch user profile from 'profiles' or 'users' table
    // const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
    
    // Mock response based on contract
    const user = {
      id: userId,
      name: req.user.user_metadata.name || "Ana Torres",
      email: req.user.email,
      role: req.user.user_metadata.role || "mentee",
      avatarUrl: "https://...",
      title: "Software Engineer",
      company: "TechCorp",
      bio: "string",
      expertise: ["Java", "React"],
      availability: {
        "2023-10-15": ["10:00", "14:00"]
      },
      created_at: req.user.created_at
    };

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    // Update user in DB
    // const { data, error } = await supabase.from('users').update(updates).eq('id', userId);

    // Mock response
    const user = {
      id: userId,
      ...updates
    };

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMyFiles = async (req, res) => {
  try {
    // Fetch files
    const files = [
        {
            id: 501,
            name: "cv_revision_final.pdf",
            url: "https://storage.example.com/...",
            uploaded_at: "2023-11-15T14:30:00Z",
            session: {
            id: 201,
            topic: "Revisión de CV",
            date: "2023-11-15"
            },
            mentorship: {
            id: 50,
            partner_name: "Dr. Elena"
            }
        }
    ];
    res.status(200).json({ files });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
