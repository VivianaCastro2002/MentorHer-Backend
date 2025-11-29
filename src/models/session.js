export default (sequelize, DataTypes) => {
  return sequelize.define('Session', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mentorshipId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'mentorship_id',
    },
    sessionNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'session_number',
    },
    scheduledAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'scheduled_at',
    },
    durationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 60,
      field: 'duration_minutes',
    },
    videoLink: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'video_link',
    },
    status: {
      type: DataTypes.ENUM(
        'pending',
        'needs_confirmation',
        'confirmed',
        'rescheduled',
        'completed',
        'cancelled',
        'termination_requested'
      ),
      allowNull: false,
      defaultValue: 'pending',
    },
    topic: { type: DataTypes.STRING(255), allowNull: true },
    menteeGoals: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'mentee_goals',
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
    tableName: 'sessions',
    schema: 'models',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { unique: true, fields: ['mentorship_id', 'session_number'] },
    ],
  });
};