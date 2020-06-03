Profile profile = [select id from profile where name = 'Standard Platform User' limit 1];
UserRole role = [select id from UserRole where Name = 'CEO'];

List<User> usr = [
    SELECT Id
    FROM User
    WHERE Email = 'plat@form.com' AND Username LIKE 'puser@%'
];

if (usr != null && usr.isEmpty()) {
    User usr = new User(
        FirstName = 'Platform',
        LastName = 'User',
        Email = 'plat@form.com',
        UserName = 'puser@' + System.URL.getSalesforceBaseURL().getHost(),
        Alias = 'puser',
        LanguageLocaleKey = 'en_US',
        LocaleSidKey = 'en_US',
        TimeZoneSidKey = 'America/Chicago',
        EmailEncodingKey = 'UTF-8',
        ProfileId = profile.Id,
        UserRoleId = role.Id
    );
    insert usr;

    List<PermissionSet> pss = [select id from PermissionSet where name = 'FormFast_User'];
    List<PermissionSetAssignment> psas = new List<PermissionSetAssignment>();

    for (PermissionSet ps : pss) {
        psas.add(new PermissionSetAssignment(PermissionSetId = ps.Id, AssigneeId = usr.Id));
    }

    try {
        insert psas;
        System.setPassword(usr.Id, 'FormFast13421');
    }
    catch (Exception ex) {
        // ignore error
    }
}

