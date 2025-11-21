module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Etiqueta', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(150), allowNull: false },
    tipo: { 
      type: DataTypes.ENUM('experiencia','tema_mentoria','objetivo_mentoria','motivacion','interes'),
      allowNull: false
    },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
    creado_en: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'etiquetas',
    timestamps: true,
    createdAt: 'creado_en',
    indexes: [
      { unique: true, fields: ['nombre', 'tipo'] }
    ]
  });
};
