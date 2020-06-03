User usr = new User(Id = UserInfo.getUserId());

UserRole role = [select id from UserRole where Name = 'CEO'];
List<PermissionSet> pss = [select id from PermissionSet where name like 'FormFast%'];

for (PermissionSet ps : [select id from PermissionSet where name like 'ProjectNext']) {
    pss.add(ps);
}

usr.UserRoleId = role.Id;

update usr;

List<PermissionSetAssignment> psas = new List<PermissionSetAssignment>();

for (PermissionSet ps : pss) {
    psas.add(new PermissionSetAssignment(PermissionSetId = ps.Id, AssigneeId = usr.Id));
}

insert psas;
