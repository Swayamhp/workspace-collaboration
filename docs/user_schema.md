### 📁 MongoDB Schema Design
## 1. users Collection
Stores individual user accounts (authentication layer).
js{
  _id: ObjectId,
  name: "John Doe",
  email: "john@example.com",
  passwordHash: "hashed_password",
  avatar: "https://cdn.example.com/avatars/john.png",
  isVerified: true,           // email verification
  refreshToken: "token...",   // for JWT refresh
  createdAt: ISODate,
  updatedAt: ISODate
}

2. workspaces Collection
Each workspace has one Owner and tracks all members with their roles.
js{
  _id: ObjectId,
  name: "My Startup Workspace",
  slug: "my-startup-workspace",   // unique, URL-friendly
  logo: "https://cdn.example.com/logos/ws.png",
  description: "Design & dev team",

  owner: ObjectId,                // ref → users._id (only 1 owner)

  members: [
    {
      userId: ObjectId,           // ref → users._id
      role: "Admin",              // "Owner" | "Admin" | "Member" | "Guest"
      joinedAt: ISODate
    },
    {
      userId: ObjectId,
      role: "Member",
      joinedAt: ISODate
    }
  ],

  settings: {
    allowGuestAccess: true,
    defaultRole: "Member"         // role assigned on invite
  },

  createdAt: ISODate,
  updatedAt: ISODate
}

3. invitations Collection
Handles pending invites before a user joins.
js{
  _id: ObjectId,
  workspaceId: ObjectId,          // ref → workspaces._id
  invitedEmail: "jane@example.com",
  role: "Member",                 // role they'll get on accepting
  token: "unique_invite_token",   // sent via email link
  invitedBy: ObjectId,            // ref → users._id
  status: "pending",              // "pending" | "accepted" | "expired"
  expiresAt: ISODate,
  createdAt: ISODate
}

🔐 Role Permission Matrix
PermissionOwnerAdminMemberGuestDelete workspace✅❌❌❌Manage billing✅❌❌❌Invite / remove members✅✅❌❌Change member roles✅✅❌❌Create projects/channels✅✅✅❌View & comment✅✅✅✅Edit content✅✅✅❌

🗂️ How the Roles Work

Owner — one per workspace, the creator. Can do everything including delete the workspace or transfer ownership.
Admin — trusted power users. Can manage members and settings but can't delete the workspace.
Member — regular collaborators. Full read/write on content, no management access.
Guest — limited, view-only access. Good for external clients or stakeholders.