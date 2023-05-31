-- CreateTable
CREATE TABLE "_rolesOnUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_rolesOnUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_rolesOnUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_permissionsOnRoles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_permissionsOnRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_permissionsOnRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_rolesOnUsers_AB_unique" ON "_rolesOnUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_rolesOnUsers_B_index" ON "_rolesOnUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_permissionsOnRoles_AB_unique" ON "_permissionsOnRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_permissionsOnRoles_B_index" ON "_permissionsOnRoles"("B");
