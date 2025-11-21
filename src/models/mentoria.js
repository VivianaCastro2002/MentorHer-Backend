module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Mentoria', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mentora_id: { type: DataTypes.INTEGER, allowNull: false },
    mentoreada_id: { type: DataTypes.INTEGER, allowNull: false },
    solicitud_conexion_id: { type: DataTypes.INTEGER, allowNull: true },
    estado: {
      type: DataTypes.ENUM('activa','completada','terminacion_solicitada','terminada','pausada'),
      allowNull: false,
      defaultValue: 'activa'
    },
    fecha_inicio: { type: DataTypes.DATEONLY, allowNull: true },
    fecha_fin: { type: DataTypes.DATEONLY, allowNull: true },
    razon_terminacion: { type: DataTypes.TEXT, allowNull: true },
    objetivos_acordados: { type: DataTypes.TEXT, allowNull: true },
    creado_en: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    actualizado_en: { type: DataTypes.DATE, allowNull: true }
  }, {
    tableName: 'mentorias',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en',
    indexes: [
      {
            unique: true,
            fields: ['mentora_id','mentoreada_id'],
            where: {
                estado: 'activa'
            }
        }
    ]
  });
};
