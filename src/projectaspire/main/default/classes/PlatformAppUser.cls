@isTest
public class PlatformAppUser extends TestUsers.PlatformUser {

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

    public PlatformAppUser() {
        super();
        registerPermissionSet(integrationUserPermSet);
        registerPermissionSet(ffClinicalPermSet);

    }
}