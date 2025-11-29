export default (sequelize, DataTypes) => {
  return sequelize.define('PrivateSessionSurvey', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: 'session_id',
    },
    mentorId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'mentor_id',
    },
    preparation: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'preparation',
    },
    engagement: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'engagement',
    },
    outcome: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'outcome',
    },
    notes: { type: DataTypes.TEXT, allowNull: true },
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
    tableName: 'private_session_surveys',
    schema: 'models',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
};