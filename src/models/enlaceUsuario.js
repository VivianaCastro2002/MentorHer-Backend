export default (sequelize, DataTypes) => {
  return sequelize.define('EnlaceUsuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    tipo: {
      type: DataTypes.ENUM('portfolio','linkedin','github','twitter','sitio_web','otro'),
      allowNull: false
    },
    url: { type: DataTypes.TEXT, allowNull: false },
    etiqueta: { type: DataTypes.STRING(150), allowNull: true },
    creado_en: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'enlaces_usuarios',
    timestamps: true,
    createdAt: 'creado_en',
    indexes: [
      { unique: true, fields: ['usuario_id','tipo','url'] }
    ]
  });
};