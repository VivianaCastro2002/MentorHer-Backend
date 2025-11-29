export default (sequelize, DataTypes) => {
  return sequelize.define('SupportTicket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'subject',
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'message',
    },
    status: {
      type: DataTypes.ENUM('open', 'in_progress', 'resolved', 'closed'),
      allowNull: false,
      defaultValue: 'open',
    },
    priority: { type: DataTypes.STRING(32), allowNull: true },
    assignedAdminId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'assigned_admin_id',
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
    closedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'closed_at',
    },
  }, {
    tableName: 'support_tickets',
    schema: 'models',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
};