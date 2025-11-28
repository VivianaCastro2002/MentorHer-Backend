import supabase from '../config/SupabaseConfig.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // In a real app, you might fetch additional user details from your database here
    // using data.user.id
    const user = {
      id: data.user.id,
      email: data.user.email,
      // ... other fields would come from your DB
    };

    res.status(200).json({
      token: data.session.access_token,
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const register = async (req, res) => {
  const { name, email, password, role, neurodivergence } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
          neurodivergence, // Store these in user_metadata
        },
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (!data.user) {
        return res.status(400).json({ error: "Registration failed" });
    }

    const user = {
      id: data.user.id,
      name: data.user.user_metadata.name,
      email: data.user.email,
      role: data.user.user_metadata.role,
      // ...
    };

    // Note: If email confirmation is enabled in Supabase, session might be null
    const token = data.session ? data.session.access_token : null;

    res.status(201).json({
      token: token,
      user: user,
      message: !token ? 'Please confirm your email' : undefined
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
