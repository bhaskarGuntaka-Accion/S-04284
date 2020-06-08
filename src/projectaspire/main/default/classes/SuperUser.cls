@isTest
public class SuperUser extends TestUsers.SysAdmin {

    private static final PermissionSet ffUserPermSet = [
        SELECT Id
        FROM PermissionSet
        WHERE Name = 'FormFast_User' LIMIT 1
    ];

    public SuperUser() {
        super();
        registerPermissionSet(ffUserPermSet);
    }
}