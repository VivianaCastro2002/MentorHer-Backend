module.exports = (sequelize, DataTypes) => {
  return sequelize.define('SolicitudConexion', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mentoreada_id: { type: DataTypes.INTEGER, allowNull: false },
    mentora_id: { type: DataTypes.INTEGER, allowNull: false },
    carta_motivacion: { type: DataTypes.TEXT, allowNull: true },
    estado: { 
      type: DataTypes.ENUM('pendiente','aceptada','rechazada','cancelada'),
      allowNull: false,
      defaultValue: 'pendiente'
    },
    creado_en: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    actualizado_en: { type: DataTypes.DATE, allowNull: true },
    respondida_en: { type: DataTypes.DATE, allowNull: true },
    mensaje_respuesta: { type: DataTypes.TEXT, allowNull: true }
  }, {
    tableName: 'solicitudes_conexion',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en',
  });
};
