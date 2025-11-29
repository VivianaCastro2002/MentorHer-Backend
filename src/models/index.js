import { Sequelize, DataTypes } from 'sequelize';

// Models (refactored to English + UUID + schema "models")
import createUser from './user.js';
import createMentorProfile from './mentorProfile.js';
import createMenteeProfile from './menteeProfile.js';
import createPaper from './paper.js';
import createTag from './tag.js';
import createUserTag from './userTag.js';
import createAvailabilityBlock from './availabilityBlock.js';
import createConnectionRequest from './connectionRequest.js';
import createMentorship from './mentorship.js';
import createSession from './session.js';
import createSessionFile from './sessionFile.js';
import createSessionFeedback from './sessionFeedback.js';
import createPrivateSessionSurvey from './privateSessionSurvey.js';
import createSupportTicket from './supportTicket.js';
import createUserLink from './userLink.js';

const config = {
  database: process.env.DB_NAME || 'mentorher',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: false,
};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: config.logging,
  timezone: '+00:00',
});

// ---------- Initialize models ----------

const User = createUser(sequelize, DataTypes);
const MentorProfile = createMentorProfile(sequelize, DataTypes);
const MenteeProfile = createMenteeProfile(sequelize, DataTypes);
const Paper = createPaper(sequelize, DataTypes);
const Tag = createTag(sequelize, DataTypes);
const UserTag = createUserTag(sequelize, DataTypes);
const AvailabilityBlock = createAvailabilityBlock(sequelize, DataTypes);
const ConnectionRequest = createConnectionRequest(sequelize, DataTypes);
const Mentorship = createMentorship(sequelize, DataTypes);
const Session = createSession(sequelize, DataTypes);
const SessionFile = createSessionFile(sequelize, DataTypes);
const SessionFeedback = createSessionFeedback(sequelize, DataTypes);
const PrivateSessionSurvey = createPrivateSessionSurvey(sequelize, DataTypes);
const SupportTicket = createSupportTicket(sequelize, DataTypes);
const UserLink = createUserLink(sequelize, DataTypes);

// ---------- Associations ----------

// Profiles 1:1
User.hasOne(MentorProfile, { foreignKey: 'user_id', as: 'mentorProfile' });
MentorProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasOne(MenteeProfile, { foreignKey: 'user_id', as: 'menteeProfile' });
MenteeProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Papers (1:N)
User.hasMany(Paper, { foreignKey: 'user_id', as: 'papers' });
Paper.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Tags M:N
User.belongsToMany(Tag, {
  through: UserTag,
  foreignKey: 'user_id',
  otherKey: 'tag_id',
  as: 'tags',
});
Tag.belongsToMany(User, {
  through: UserTag,
  foreignKey: 'tag_id',
  otherKey: 'user_id',
  as: 'users',
});
UserTag.belongsTo(User, { foreignKey: 'user_id' });
UserTag.belongsTo(Tag, { foreignKey: 'tag_id' });

// Availability (mentor availability blocks)
User.hasMany(AvailabilityBlock, { foreignKey: 'mentor_id', as: 'availability' });
AvailabilityBlock.belongsTo(User, { foreignKey: 'mentor_id', as: 'mentor' });

// Connection requests and mentorships
User.hasMany(ConnectionRequest, {
  foreignKey: 'mentee_id',
  as: 'sentConnectionRequests',
});
User.hasMany(ConnectionRequest, {
  foreignKey: 'mentor_id',
  as: 'receivedConnectionRequests',
});
ConnectionRequest.belongsTo(User, { foreignKey: 'mentee_id', as: 'mentee' });
ConnectionRequest.belongsTo(User, { foreignKey: 'mentor_id', as: 'mentor' });

User.hasMany(Mentorship, {
  foreignKey: 'mentor_id',
  as: 'mentorshipsAsMentor',
});
User.hasMany(Mentorship, {
  foreignKey: 'mentee_id',
  as: 'mentorshipsAsMentee',
});
Mentorship.belongsTo(User, { foreignKey: 'mentor_id', as: 'mentor' });
Mentorship.belongsTo(User, { foreignKey: 'mentee_id', as: 'mentee' });

ConnectionRequest.hasMany(Mentorship, {
  foreignKey: 'connection_request_id',
  as: 'mentorships',
});
Mentorship.belongsTo(ConnectionRequest, {
  foreignKey: 'connection_request_id',
  as: 'connectionRequest',
});

// Sessions within a mentorship
Mentorship.hasMany(Session, {
  foreignKey: 'mentorship_id',
  as: 'sessions',
});
Session.belongsTo(Mentorship, {
  foreignKey: 'mentorship_id',
  as: 'mentorship',
});

// Files, feedback, surveys per session
Session.hasMany(SessionFile, {
  foreignKey: 'session_id',
  as: 'files',
});
SessionFile.belongsTo(Session, { foreignKey: 'session_id', as: 'session' });

Session.hasMany(SessionFeedback, {
  foreignKey: 'session_id',
  as: 'feedbacks',
});
SessionFeedback.belongsTo(Session, {
  foreignKey: 'session_id',
  as: 'session',
});
SessionFeedback.belongsTo(User, {
  foreignKey: 'reviewer_id',
  as: 'reviewer',
});

Session.hasOne(PrivateSessionSurvey, {
  foreignKey: 'session_id',
  as: 'privateSurvey',
});
PrivateSessionSurvey.belongsTo(Session, {
  foreignKey: 'session_id',
  as: 'session',
});
PrivateSessionSurvey.belongsTo(User, {
  foreignKey: 'mentor_id',
  as: 'mentor',
});

// Support tickets and user links
User.hasMany(SupportTicket, { foreignKey: 'user_id', as: 'tickets' });
SupportTicket.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});
SupportTicket.belongsTo(User, {
  foreignKey: 'assigned_admin_id',
  as: 'assignedAdmin',
});

User.hasMany(UserLink, { foreignKey: 'user_id', as: 'links' });
UserLink.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export {
  sequelize,
  Sequelize,
  User,
  MentorProfile,
  MenteeProfile,
  Paper,
  Tag,
  UserTag,
  AvailabilityBlock,
  ConnectionRequest,
  Mentorship,
  Session,
  SessionFile,
  SessionFeedback,
  PrivateSessionSurvey,
  SupportTicket,
  UserLink,
};