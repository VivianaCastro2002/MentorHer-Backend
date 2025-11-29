import supabase from '../config/SupabaseConfig.js';

const seed = async () => {
    console.log('🌱 Starting database seed...');

    const db = (table) => supabase.schema('models').from(table);

    try {
        // --- 1. Users (Auth + Models) ---
        console.log('Creating Users...');

        const usersToCreate = [
            {
                email: 'ana.garcia@example.com',
                password: 'password123',
                name: 'Ana García',
                role: 'mentor',
                timezone: 'America/Santiago',
                avatar_url: 'https://i.pravatar.cc/150?u=ana'
            },
            {
                email: 'elena.rodriguez@example.com',
                password: 'password123',
                name: 'Elena Rodríguez',
                role: 'mentor',
                timezone: 'America/Mexico_City',
                avatar_url: 'https://i.pravatar.cc/150?u=elena'
            },
            {
                email: 'lucia.fernandez@example.com',
                password: 'password123',
                name: 'Lucía Fernández',
                role: 'mentee',
                timezone: 'America/Bogota',
                avatar_url: 'https://i.pravatar.cc/150?u=lucia'
            },
            {
                email: 'sofia.martinez@example.com',
                password: 'password123',
                name: 'Sofía Martínez',
                role: 'mentee',
                timezone: 'America/Buenos_Aires',
                avatar_url: 'https://i.pravatar.cc/150?u=sofia'
            }
        ];

        const createdUsers = [];

        for (const u of usersToCreate) {
            let userId = null;

            // 1. Intentar crear en Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: u.email,
                password: u.password,
            });

            if (authError) {
                // Si el usuario ya existe
                if (authError.message.includes("User already registered") || authError.message.includes("already registered")) {
                    console.log(`ℹ️ User ${u.email} exists in Auth. Syncing model...`);
                    
                    // A. Intentar buscar en tabla pública models.users
                    const { data: existingModel } = await db('users')
                        .select('id')
                        .eq('email', u.email)
                        .maybeSingle();

                    if (existingModel) {
                        userId = existingModel.id;
                    } else {
                        // B. CORRECCIÓN: Usar Admin API en lugar de SQL directo a auth
                        // Esto evita el error "Schema Cache"
                        const { data: userList, error: listError } = await supabase.auth.admin.listUsers();
                        
                        if (listError) {
                            console.error(`❌ Admin API Error: ${listError.message}`);
                            continue;
                        }

                        // Buscamos manualmente en la lista devuelta
                        const foundAuthUser = userList.users.find(user => user.email === u.email);

                        if (foundAuthUser) {
                            userId = foundAuthUser.id;
                        } else {
                            console.error(`❌ CRITICAL: User exists in Auth but not returned by listUsers. Skipping.`);
                            continue;
                        }
                    }
                } else {
                    console.warn(`⚠️ Could not create auth user for ${u.email}: ${authError.message}`);
                    continue;
                }
            } else {
                userId = authData.user?.id;
            }

            if (!userId) {
                console.warn(`⚠️ No user ID found for ${u.email}`);
                continue;
            }

            // 2. Insert/Upsert into models.users
            const { data: modelUser, error: modelError } = await db('users')
                .upsert({
                    id: userId,
                    name: u.name,
                    email: u.email,
                    role: u.role,
                    timezone: u.timezone,
                    avatar_url: u.avatar_url
                })
                .select()
                .single();

            if (modelError) {
                console.error(`❌ Error inserting user model for ${u.email}: ${modelError.message}`);
            } else {
                createdUsers.push(modelUser);
                console.log(`✅ Synced/Created user: ${u.name} (${u.role})`);
            }
        }

        // Helper to find seeded users
        const findUser = (email) => createdUsers.find(u => u.email === email);
        const ana = findUser('ana.garcia@example.com');
        const elena = findUser('elena.rodriguez@example.com');
        const lucia = findUser('lucia.fernandez@example.com');
        const sofia = findUser('sofia.martinez@example.com');

        // --- 2. Profiles ---
        console.log('Creating Profiles...');

        if (ana) {
            await db('mentor_profiles').upsert({
                user_id: ana.id,
                title: 'Senior Software Engineer',
                company: 'TechGlobal',
                bio: 'Ingeniera de software con más de 10 años de experiencia.',
                role_level: 'Senior',
                max_mentees: 5
            });
        }
        if (elena) {
            await db('mentor_profiles').upsert({
                user_id: elena.id,
                title: 'Data Scientist Lead',
                company: 'DataCorp',
                bio: 'Líder de equipo de ciencia de datos.',
                role_level: 'Lead',
                max_mentees: 3
            });
        }

        // Mentee Profiles
        if (lucia) {
            await db('mentee_profiles').upsert({
                user_id: lucia.id,
                title: 'Estudiante de Ingeniería',
                company: 'Universidad Nacional',
                bio: 'Estudiante de último año.',
                role_level: 'Junior',
                pronouns: 'Ella'
            });
        }
        if (sofia) {
            await db('mentee_profiles').upsert({
                user_id: sofia.id,
                title: 'Junior Frontend Dev',
                company: 'Startup Inc',
                bio: 'Desarrolladora frontend junior.',
                role_level: 'Junior',
                pronouns: 'Ella'
            });
        }

        // --- 3. Tags ---
        console.log('Creating Tags...');
        const tagsData = [
            { name: 'JavaScript', type: 'technical' },
            { name: 'Python', type: 'technical' },
            { name: 'Leadership', type: 'soft_skill' },
            { name: 'Career', type: 'topic' }
        ];

        const { data: createdTags, error: tagError } = await db('tags')
            .upsert(tagsData, { onConflict: 'name' }) 
            .select();

        if (tagError) console.warn(`Warning seeding tags: ${tagError.message}`);
        else console.log(`✅ Seeded ${createdTags.length} tags.`);

        // --- 4. Availability Blocks ---
        console.log('Creating Availability...');
        if (ana) {
            await db('availability_blocks').insert([
                {
                    mentor_id: ana.id,
                    day_of_week: 'Monday', 
                    start_time: '18:00:00',
                    end_time: '19:00:00',
                    timezone: 'America/Santiago',
                    is_recurring: true
                },
                {
                    mentor_id: ana.id,
                    day_of_week: 'Wednesday',
                    start_time: '18:00:00',
                    end_time: '19:00:00',
                    timezone: 'America/Santiago',
                    is_recurring: true
                }
            ]);
        }

        // --- 5. Connection Requests ---
        console.log('Creating Connection Requests...');
        let createdRequest = null;
        if (lucia && ana) {
            const { data } = await db('connection_requests').insert({
                mentee_id: lucia.id,
                mentor_id: ana.id,
                motivation_letter: 'Me gustaría que fueras mi mentora.',
                status: 'accepted',
                response_message: 'Claro que sí!',
                responded_at: new Date().toISOString()
            }).select().single();
            createdRequest = data;
        }

        if (sofia && elena) {
            await db('connection_requests').insert({
                mentee_id: sofia.id,
                mentor_id: elena.id,
                motivation_letter: 'Quiero aprender Data Science.',
                status: 'pending'
            });
        }

        // --- 6. Mentorships ---
        console.log('Creating Mentorships...');
        let mentorshipId = null;
        if (createdRequest) {
            const { data: mentorship } = await db('mentorships').insert({
                mentor_id: createdRequest.mentor_id,
                mentee_id: createdRequest.mentee_id,
                connection_request_id: createdRequest.id,
                status: 'active',
                start_date: new Date().toISOString(),
                mentorship_goals: 'Mejorar skills técnicos'
            }).select().single();

            if (mentorship) mentorshipId = mentorship.id;
        }

        // --- 7. Sessions ---
        if (mentorshipId) {
            console.log('Creating Sessions...');
            await db('sessions').insert({
                mentorship_id: mentorshipId,
                session_number: 1,
                scheduled_at: new Date(Date.now() + 86400000).toISOString(),
                duration_minutes: 60,
                status: 'pending',
                topic: 'Kick-off',
                mentee_goals: 'Definir plan de trabajo'
            });
        }

        console.log('🎉 Seeding completed successfully!');

    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    }
};

seed();