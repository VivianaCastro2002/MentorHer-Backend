import { Sequelize, DataTypes } from 'sequelize';

import createUsuario from './usuario.js';
import createPerfilMentora from './perfilMentora.js';
import createPerfilMentoreada from './perfilMentoreada.js';
import createPaper from './paper.js';
import createEtiqueta from './etiqueta.js';
import createUsuarioEtiqueta from './usuarioEtiqueta.js';
import createDisponibilidadBloque from './disponibilidadBloque.js';
import createSolicitudConexion from './solicitudConexion.js';
import createMentoria from './mentoria.js';
import createSesion from './sesion.js';
import createArchivoSesion from './archivoSesion.js';
import createFeedbackSesion from './feedbackSesion.js';
import createEncuestaPrivadaSesion from './encuestaPrivadaSesion.js';
import createTicketSoporte from './ticketSoporte.js';
import createEnlaceUsuario from './enlaceUsuario.js';

const config = {
  database: process.env.DB_NAME || 'mentorher',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: false,
};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: config.logging,
  timezone: '+00:00',
});

// Inicializar modelos
const Usuario = createUsuario(sequelize, DataTypes);
const PerfilMentora = createPerfilMentora(sequelize, DataTypes);
const PerfilMentoreada = createPerfilMentoreada(sequelize, DataTypes);
const Paper = createPaper(sequelize, DataTypes);
const Etiqueta = createEtiqueta(sequelize, DataTypes);
const UsuarioEtiqueta = createUsuarioEtiqueta(sequelize, DataTypes);
const DisponibilidadBloque = createDisponibilidadBloque(sequelize, DataTypes);
const SolicitudConexion = createSolicitudConexion(sequelize, DataTypes);
const Mentoria = createMentoria(sequelize, DataTypes);
const Sesion = createSesion(sequelize, DataTypes);
const ArchivoSesion = createArchivoSesion(sequelize, DataTypes);
const FeedbackSesion = createFeedbackSesion(sequelize, DataTypes);
const EncuestaPrivadaSesion = createEncuestaPrivadaSesion(sequelize, DataTypes);
const TicketSoporte = createTicketSoporte(sequelize, DataTypes);
const EnlaceUsuario = createEnlaceUsuario(sequelize, DataTypes);

// ---------- Associations ----------

// Perfiles 1:1
Usuario.hasOne(PerfilMentora, { foreignKey: 'usuario_id', as: 'perfilMentora' });
PerfilMentora.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

Usuario.hasOne(PerfilMentoreada, { foreignKey: 'usuario_id', as: 'perfilMentoreada' });
PerfilMentoreada.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

// Papers (1:N)
Usuario.hasMany(Paper, { foreignKey: 'usuario_id', as: 'papers' });
Paper.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

// Etiquetas M:N
Usuario.belongsToMany(Etiqueta, {
  through: UsuarioEtiqueta,
  foreignKey: 'usuario_id',
  otherKey: 'etiqueta_id',
  as: 'etiquetas'
});
Etiqueta.belongsToMany(Usuario, {
  through: UsuarioEtiqueta,
  foreignKey: 'etiqueta_id',
  otherKey: 'usuario_id',
  as: 'usuarios'
});
UsuarioEtiqueta.belongsTo(Usuario, { foreignKey: 'usuario_id' });
UsuarioEtiqueta.belongsTo(Etiqueta, { foreignKey: 'etiqueta_id' });

// Disponibilidad
Usuario.hasMany(DisponibilidadBloque, { foreignKey: 'mentora_id', as: 'disponibilidad' });
DisponibilidadBloque.belongsTo(Usuario, { foreignKey: 'mentora_id', as: 'mentora' });

// Solicitudes y mentorías
Usuario.hasMany(SolicitudConexion, { foreignKey: 'mentoreada_id', as: 'solicitudesEnviadas' });
Usuario.hasMany(SolicitudConexion, { foreignKey: 'mentora_id', as: 'solicitudesRecibidas' });
SolicitudConexion.belongsTo(Usuario, { foreignKey: 'mentoreada_id', as: 'mentoreada' });
SolicitudConexion.belongsTo(Usuario, { foreignKey: 'mentora_id', as: 'mentora' });

Usuario.hasMany(Mentoria, { foreignKey: 'mentora_id', as: 'mentoriasComoMentora' });
Usuario.hasMany(Mentoria, { foreignKey: 'mentoreada_id', as: 'mentoriasComoMentoreada' });
Mentoria.belongsTo(Usuario, { foreignKey: 'mentora_id', as: 'mentora' });
Mentoria.belongsTo(Usuario, { foreignKey: 'mentoreada_id', as: 'mentoreada' });

SolicitudConexion.hasMany(Mentoria, { foreignKey: 'solicitud_conexion_id' });
Mentoria.belongsTo(SolicitudConexion, { foreignKey: 'solicitud_conexion_id' });

// Sesiones dentro de mentoría
Mentoria.hasMany(Sesion, { foreignKey: 'mentoria_id', as: 'sesiones' });
Sesion.belongsTo(Mentoria, { foreignKey: 'mentoria_id', as: 'mentoria' });

// Archivos, feedback, encuestas
Sesion.hasMany(ArchivoSesion, { foreignKey: 'sesion_id', as: 'archivos' });
ArchivoSesion.belongsTo(Sesion, { foreignKey: 'sesion_id' });

Sesion.hasMany(FeedbackSesion, { foreignKey: 'sesion_id', as: 'feedbacks' });
FeedbackSesion.belongsTo(Sesion, { foreignKey: 'sesion_id' });
FeedbackSesion.belongsTo(Usuario, { foreignKey: 'reviewer_id', as: 'reviewer' });

Sesion.hasOne(EncuestaPrivadaSesion, { foreignKey: 'sesion_id', as: 'encuestaPrivada' });
EncuestaPrivadaSesion.belongsTo(Sesion, { foreignKey: 'sesion_id' });
EncuestaPrivadaSesion.belongsTo(Usuario, { foreignKey: 'mentora_id', as: 'mentora' });

// Tickets y enlaces
Usuario.hasMany(TicketSoporte, { foreignKey: 'usuario_id', as: 'tickets' });
TicketSoporte.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
TicketSoporte.belongsTo(Usuario, { foreignKey: 'admin_asignado_id', as: 'adminAsignado' });

Usuario.hasMany(EnlaceUsuario, { foreignKey: 'usuario_id', as: 'enlaces' });
EnlaceUsuario.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

export {
  sequelize,
  Sequelize,
  Usuario,
  PerfilMentora,
  PerfilMentoreada,
  Paper,
  Etiqueta,
  UsuarioEtiqueta,
  DisponibilidadBloque,
  SolicitudConexion,
  Mentoria,
  Sesion,
  ArchivoSesion,
  FeedbackSesion,
  EncuestaPrivadaSesion,
  TicketSoporte,
  EnlaceUsuario,
};