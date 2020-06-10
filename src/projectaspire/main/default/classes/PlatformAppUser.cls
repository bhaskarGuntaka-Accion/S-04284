@isTest
public class PlatformAppUser extends TestUsers.PlatformUser {

    private static final PermissionSet integrationUserPermSet = [
        SELECT Id
        FROM PermissionSet
        WHERE Name = 'FormFast_User' LIMIT 1
    ];
    public PlatformAppUser() {
        super();
        registerPermissionSet(integrationUserPermSet);
    }
}