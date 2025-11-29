export default (sequelize, DataTypes) => {
  return sequelize.define('Tag', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(150), allowNull: false, field: 'name' },
    type: {
      type: DataTypes.ENUM(
        'experience',
        'mentoring_topic',
        'mentoring_goal',
        'motivation',
        'interest'
      ),
      allowNull: false,
    },
    description: { type: DataTypes.TEXT, allowNull: true, field: 'description' },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
  }, {
    tableName: 'tags',
    schema: 'models',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
      { unique: true, fields: ['name', 'type'] },
    ],
  });
};