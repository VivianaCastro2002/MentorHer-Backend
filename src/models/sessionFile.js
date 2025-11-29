export default (sequelize, DataTypes) => {
  return sequelize.define('SessionFile', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'session_id',
    },
    name: { type: DataTypes.STRING(255), allowNull: true },
    url: { type: DataTypes.TEXT, allowNull: false },
    uploadedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'uploaded_at',
    },
  }, {
    tableName: 'session_files',
    schema: 'models',
    timestamps: false,
  });
};