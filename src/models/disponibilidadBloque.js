export default (sequelize, DataTypes) => {
  return sequelize.define('DisponibilidadBloque', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mentora_id: { type: DataTypes.INTEGER, allowNull: false },
    dia: { 
      type: DataTypes.ENUM('domingo','lunes','martes','miercoles','jueves','viernes','sabado'),
      allowNull: true
    },
    hora_inicio: { type: DataTypes.TIME, allowNull: false },
    hora_fin: { type: DataTypes.TIME, allowNull: false },
    fecha_especifica: { type: DataTypes.DATEONLY, allowNull: true },
    timezone: { type: DataTypes.STRING(64), allowNull: true },
    recurrente: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    esta_reservado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    notas: { type: DataTypes.TEXT, allowNull: true },
    creado_en: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    actualizado_en: { type: DataTypes.DATE, allowNull: true }
  }, {
    tableName: 'disponibilidad_bloques',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en',
    indexes: [
      { fields: ['mentora_id','dia','hora_inicio','hora_fin'] }
    ]
  });
};