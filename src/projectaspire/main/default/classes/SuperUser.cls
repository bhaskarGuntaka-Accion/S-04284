@isTest
public class SuperUser extends TestUsers.SysAdmin {

    private static final PermissionSet ffClinicalPermSet = [
        SELECT Id
        FROM PermissionSet
        WHERE Name = 'Interlace_Health_Preregistration_Clinician' LIMIT 1
    ];
    private static final PermissionSet ffUserPermSet = [
        SELECT Id
        FROM PermissionSet
        WHERE Name = 'FormFast_User' LIMIT 1
    ];
    private static final PermissionSet ffIntegrationUserPermSet = [
        SELECT Id
        FROM PermissionSet
        WHERE Name = 'FormFast_Experience_Integration_User' LIMIT 1
    ];



    public SuperUser() {
        super();
        registerPermissionSet(ffUserPermSet);
        registerPermissionSet(ffClinicalPermSet);
        registerPermissionSet(ffIntegrationUserPermSet);
    }
}