module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Sesion', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mentoria_id: { type: DataTypes.INTEGER, allowNull: false },
    numero_sesion: { type: DataTypes.INTEGER, allowNull: true },
    scheduled_at: { type: DataTypes.DATE, allowNull: false },
    duracion_minutos: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 60 },
    enlace_video: { type: DataTypes.TEXT, allowNull: true },
    estado: {
      type: DataTypes.ENUM('pendiente','requiere_confirmacion','confirmada','reprogramada','completada','cancelada','terminacion_solicitada'),
      allowNull: false,
      defaultValue: 'pendiente'
    },
    tema: { type: DataTypes.STRING(255), allowNull: true },
    objetivos_mentoreada: { type: DataTypes.TEXT, allowNull: true },
    notas: { type: DataTypes.TEXT, allowNull: true },
    creado_en: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    actualizado_en: { type: DataTypes.DATE, allowNull: true }
  }, {
    tableName: 'sesiones',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en',
    indexes: [
      { unique: true, fields: ['mentoria_id','numero_sesion'] }
    ]
  });
};
