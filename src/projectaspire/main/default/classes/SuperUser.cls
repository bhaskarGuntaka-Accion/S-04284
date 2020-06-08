@isTest
public class SuperUser extends TestUsers.SysAdmin {

    private static final PermissionSet ffUserPermSet = [
        SELECT Id
        FROM PermissionSet
        WHERE Name = 'Interlace_Health_Preregistration_Clinician' LIMIT 1
    ];

    public SuperUser() {
        super();
        registerPermissionSet(ffUserPermSet);
    }
}