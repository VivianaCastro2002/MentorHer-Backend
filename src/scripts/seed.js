import supabase from '../config/SupabaseConfig.js';

const seed = async () => {
    console.log('🌱 Starting database seed...');

    const db = (table) => supabase.schema('models').from(table);

    try {
        // --- 1. Users ---
        console.log('Creating Users...');

        const usersToCreate = [
            // --- MENTORAS ---
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
                email: 'carmen.vega@example.com',
                password: 'password123',
                name: 'Dra. Carmen Vega',
                role: 'mentor',
                timezone: 'Europe/Madrid',
                avatar_url: 'https://i.pravatar.cc/150?u=carmen'
            },
            {
                email: 'patricia.chang@example.com',
                password: 'password123',
                name: 'Patricia Chang',
                role: 'mentor',
                timezone: 'America/New_York',
                avatar_url: 'https://i.pravatar.cc/150?u=patty'
            },
            // --- MENTEES (7) ---
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
            },
            {
                email: 'valentina.ruiz@example.com',
                password: 'password123',
                name: 'Valentina Ruiz',
                role: 'mentee',
                timezone: 'America/Lima',
                avatar_url: 'https://i.pravatar.cc/150?u=valen'
            },
            {
                email: 'camila.torres@example.com',
                password: 'password123',
                name: 'Camila Torres',
                role: 'mentee',
                timezone: 'America/Santiago',
                avatar_url: 'https://i.pravatar.cc/150?u=camila'
            },
            {
                email: 'isabella.rossi@example.com',
                password: 'password123',
                name: 'Isabella Rossi',
                role: 'mentee',
                timezone: 'Europe/Rome',
                avatar_url: 'https://i.pravatar.cc/150?u=isa'
            },
            {
                email: 'mariana.silva@example.com',
                password: 'password123',
                name: 'Mariana Silva',
                role: 'mentee',
                timezone: 'America/Sao_Paulo',
                avatar_url: 'https://i.pravatar.cc/150?u=mari'
            },
            {
                email: 'gaby.oconnor@example.com',
                password: 'password123',
                name: 'Gabriela O\'Connor',
                role: 'mentee',
                timezone: 'Europe/Dublin',
                avatar_url: 'https://i.pravatar.cc/150?u=gaby'
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
        
        // Mentoras
        const ana = findUser('ana.garcia@example.com');
        const elena = findUser('elena.rodriguez@example.com');
        const carmen = findUser('carmen.vega@example.com');
        const patricia = findUser('patricia.chang@example.com');

        // Mentees
        const lucia = findUser('lucia.fernandez@example.com');
        const sofia = findUser('sofia.martinez@example.com');
        const valentina = findUser('valentina.ruiz@example.com');
        const camila = findUser('camila.torres@example.com');
        const isabella = findUser('isabella.rossi@example.com');
        const mariana = findUser('mariana.silva@example.com');
        const gaby = findUser('gaby.oconnor@example.com');


        // --- 2. Profiles ---
        console.log('Creating Profiles...');

        // -- MENTOR PROFILES --
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
        if (carmen) {
            await db('mentor_profiles').upsert({
                user_id: carmen.id,
                title: 'Investigadora en Bioinformática',
                company: 'BioGen Institute',
                bio: 'Doctora en Biotecnología. Uso algoritmos para entender el genoma.',
                role_level: 'Principal',
                max_mentees: 2
            });
        }
        if (patricia) {
            await db('mentor_profiles').upsert({
                user_id: patricia.id,
                title: 'Cybersecurity Manager',
                company: 'SecureNet',
                bio: 'CISO con experiencia en seguridad en la nube y hacking ético.',
                role_level: 'Manager',
                max_mentees: 4
            });
        }

        // -- MENTEE PROFILES --
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
        if (valentina) {
            await db('mentee_profiles').upsert({
                user_id: valentina.id,
                title: 'Estudiante de Biología',
                company: 'Universidad de Lima',
                bio: 'Quiero aprender Python para analizar mis datos de laboratorio.',
                role_level: 'Student',
                pronouns: 'Ella'
            });
        }
        if (camila) {
            await db('mentee_profiles').upsert({
                user_id: camila.id,
                title: 'UX/UI Designer en transición',
                company: 'Freelance',
                bio: 'Diseñadora gráfica aprendiendo código.',
                role_level: 'Junior',
                pronouns: 'Elle'
            });
        }
        if (isabella) {
            await db('mentee_profiles').upsert({
                user_id: isabella.id,
                title: 'Analista Financiera',
                company: 'FinBank',
                bio: 'Interesada en fintech y algoritmos.',
                role_level: 'Mid',
                pronouns: 'Ella'
            });
        }
        if (mariana) {
            await db('mentee_profiles').upsert({
                user_id: mariana.id,
                title: 'DevOps Intern',
                company: 'CloudNine',
                bio: 'Aprendiendo sobre Docker y Kubernetes.',
                role_level: 'Intern',
                pronouns: 'Ella'
            });
        }
        if (gaby) {
            await db('mentee_profiles').upsert({
                user_id: gaby.id,
                title: 'Estudiante de Robótica',
                company: 'Tech High School',
                bio: 'Fanática de Arduino.',
                role_level: 'Student',
                pronouns: 'Ella'
            });
        }

        // --- 3. Tags ---
        console.log('Creating Tags...');
        const tagsData = [
            { name: 'JavaScript', type: 'technical' },
            { name: 'Python', type: 'technical' },
            { name: 'Leadership', type: 'soft_skill' },
            { name: 'Career', type: 'topic' },
            { name: 'Bioinformatics', type: 'technical' },
            { name: 'Cybersecurity', type: 'technical' },
            { name: 'Robotics', type: 'technical' },
            { name: 'Data Science', type: 'technical' },
            { name: 'DevOps', type: 'technical' },
            { name: 'UX Design', type: 'technical' }
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
                    day_of_week: 'monday', 
                    start_time: '18:00:00',
                    end_time: '19:00:00',
                    timezone: 'America/Santiago',
                    is_recurring: true
                },
                {
                    mentor_id: ana.id,
                    day_of_week: 'wednesday',
                    start_time: '18:00:00',
                    end_time: '19:00:00',
                    timezone: 'America/Santiago',
                    is_recurring: true
                }
            ]);
        }
        if (patricia) {
            await db('availability_blocks').insert([
                {
                    mentor_id: patricia.id,
                    day_of_week: 'Thursday', 
                    start_time: '10:00:00',
                    end_time: '12:00:00',
                    timezone: 'America/New_York',
                    is_recurring: true
                }
            ]);
        }

        // --- 5. Connection Requests ---
        console.log('Creating Connection Requests...');
        
        let reqAna = null;
        let reqCarmen = null;
        let reqPatricia = null;

        // 1. Lucia -> Ana (Aceptada)
        if (lucia && ana) {
            const { data } = await db('connection_requests').insert({
                mentee_id: lucia.id,
                mentor_id: ana.id,
                motivation_letter: 'Me gustaría que fueras mi mentora.',
                status: 'accepted',
                response_message: 'Claro que sí!',
                responded_at: new Date().toISOString()
            }).select().single();
            reqAna = data;
        }

        // 2. Sofia -> Elena (Pendiente)
        if (sofia && elena) {
            await db('connection_requests').insert({
                mentee_id: sofia.id,
                mentor_id: elena.id,
                motivation_letter: 'Quiero aprender Data Science.',
                status: 'pending'
            });
        }

        // 3. Valentina -> Carmen (Aceptada - Bio)
        if (valentina && carmen) {
            const { data } = await db('connection_requests').insert({
                mentee_id: valentina.id,
                mentor_id: carmen.id,
                motivation_letter: 'Soy estudiante de biología y quiero aprender código.',
                status: 'accepted',
                response_message: 'Me encanta tu perfil, hablemos.',
                responded_at: new Date().toISOString()
            }).select().single();
            reqCarmen = data;
        }

        // 4. Mariana -> Patricia (Aceptada - DevOps/Sec)
        if (mariana && patricia) {
            const { data } = await db('connection_requests').insert({
                mentee_id: mariana.id,
                mentor_id: patricia.id,
                motivation_letter: 'Quiero orientar mi carrera a DevSecOps.',
                status: 'accepted',
                response_message: 'Excelente, necesitamos más mujeres en seguridad.',
                responded_at: new Date().toISOString()
            }).select().single();
            reqPatricia = data;
        }

        // 5. Gaby -> Ana (Pendiente)
        if (gaby && ana) {
            await db('connection_requests').insert({
                mentee_id: gaby.id,
                mentor_id: ana.id,
                motivation_letter: '¿Sabes de sistemas embebidos?',
                status: 'rejected',
                response_message: 'No tengo experiencia con eso.',
                responded_at: new Date().toISOString()
            });
        }

        // --- 6. Mentorships ---
        console.log('Creating Mentorships...');
        
        let mentorshipAna = null;
        let mentorshipCarmen = null;
        let mentorshipPatricia = null;

        // Mentoría Ana - Lucia
        if (reqAna) {
            const { data: m } = await db('mentorships').insert({
                mentor_id: reqAna.mentor_id,
                mentee_id: reqAna.mentee_id,
                connection_request_id: reqAna.id,
                status: 'active',
                start_date: new Date().toISOString(),
                mentorship_goals: 'Mejorar skills técnicos'
            }).select().single();
            mentorshipAna = m;
        }

        // Mentoría Carmen - Valentina
        if (reqCarmen) {
            const { data: m } = await db('mentorships').insert({
                mentor_id: reqCarmen.mentor_id,
                mentee_id: reqCarmen.mentee_id,
                connection_request_id: reqCarmen.id,
                status: 'active',
                start_date: new Date().toISOString(),
                mentorship_goals: 'Aprender Python para análisis genético'
            }).select().single();
            mentorshipCarmen = m;
        }

        // Mentoría Patricia - Mariana
        if (reqPatricia) {
            const { data: m } = await db('mentorships').insert({
                mentor_id: reqPatricia.mentor_id,
                mentee_id: reqPatricia.mentee_id,
                connection_request_id: reqPatricia.id,
                status: 'active',
                start_date: new Date().toISOString(),
                mentorship_goals: 'Roadmap de ciberseguridad'
            }).select().single();
            mentorshipPatricia = m;
        }

        // --- 7. Sessions ---
        console.log('Creating Sessions...');
        
        if (mentorshipAna) {
            await db('sessions').insert({
                mentorship_id: mentorshipAna.id,
                session_number: 1,
                scheduled_at: new Date(Date.now() + 86400000).toISOString(),
                duration_minutes: 60,
                status: 'pending',
                topic: 'Kick-off',
                mentee_goals: 'Definir plan de trabajo'
            });
        }

        if (mentorshipCarmen) {
            await db('sessions').insert({
                mentorship_id: mentorshipCarmen.id,
                session_number: 1,
                scheduled_at: new Date(Date.now() - 86400000).toISOString(), // Pasada
                duration_minutes: 45,
                status: 'completed',
                topic: 'Introducción a Pandas',
                mentee_goals: 'Entender dataframes',
                notes: 'Valentina avanza rápido.'
            });
        }

        console.log('🎉 Seeding completed successfully!');

    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    }
};

seed();