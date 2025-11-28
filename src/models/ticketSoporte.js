export default (sequelize, DataTypes) => {
  return sequelize.define('TicketSoporte', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    asunto: { type: DataTypes.STRING(255), allowNull: false },
    mensaje: { type: DataTypes.TEXT, allowNull: false },
    estado: {
      type: DataTypes.ENUM('abierto','en_progreso','resuelto','cerrado'),
      allowNull: false,
      defaultValue: 'abierto'
    },
    prioridad: { type: DataTypes.STRING(32), allowNull: true },
    admin_asignado_id: { type: DataTypes.INTEGER, allowNull: true },
    creado_en: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    actualizado_en: { type: DataTypes.DATE, allowNull: true },
    cerrado_en: { type: DataTypes.DATE, allowNull: true }
  }, {
    tableName: 'tickets_soporte',
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en',
    timestamps: true
  });
};