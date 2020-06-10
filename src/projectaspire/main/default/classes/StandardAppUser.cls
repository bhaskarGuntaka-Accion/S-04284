@isTest
public class StandardAppUser extends TestUsers.StandardUser {

    private static final PermissionSet integrationUserPermSet = [
        SELECT Id
        FROM PermissionSet
        WHERE Name = 'FormFast_User' LIMIT 1
    ];
    private static final PermissionSet ffClinicalPermSet = [
        SELECT Id
        FROM PermissionSet
        WHERE Name = 'Interlace_Health_Preregistration_Clinician' LIMIT 1
    ];

    public StandardAppUser() {
        super();
        registerPermissionSet(integrationUserPermSet);
        registerPermissionSet(ffClinicalPermSet);
    }
}