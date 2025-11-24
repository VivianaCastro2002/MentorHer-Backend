export default (sequelize, DataTypes) => {
  return sequelize.define('UsuarioEtiqueta', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    etiqueta_id: { type: DataTypes.INTEGER, allowNull: false },
    relevancia: { type: DataTypes.INTEGER, allowNull: true },
    creado_en: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'usuarios_etiquetas',
    timestamps: true,
    createdAt: 'creado_en',  
    indexes: [
      { unique: true, fields: ['usuario_id', 'etiqueta_id'] }
    ]
  });
};