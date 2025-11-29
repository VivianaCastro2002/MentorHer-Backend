export default (sequelize, DataTypes) => {
  return sequelize.define('MenteeProfile', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      field: 'user_id',
    },
    title: { type: DataTypes.STRING(255), allowNull: true },
    company: { type: DataTypes.STRING(255), allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },
    roleLevel: { type: DataTypes.STRING(64), allowNull: true, field: 'role_level' },
    pronouns: { type: DataTypes.STRING(64), allowNull: true },
    isNeurodivergent: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_neurodivergent',
    },
    neurodivergenceDetails: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'neurodivergence_details',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at',
    },
  }, {
    tableName: 'mentee_profiles',
    schema: 'models',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
};