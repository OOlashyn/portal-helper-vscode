export class Commands {
    public static PortalList() {
        return 'pac paportal list';
    }

    public static DownloadPortal(localPath: string, websiteId: string, overwritePortal: string | undefined, includedEntities?: string, excludedEntities?: string) {
        const overwriteText = overwritePortal === 'Yes' ? `-o true` : '';
        const includeEntities = includedEntities ? `-ie "${includedEntities}"`: '';
        const excludeEntities = excludedEntities ? `-xe "${excludedEntities}"`: '';
        return `pac paportal download -p "${localPath}" -id ${websiteId} ${overwriteText} ${includeEntities} ${excludeEntities}`;
    }

    public static UploadPortal(localPath: string, deploymentProfile: string | undefined) {
        const command = deploymentProfile
            ? `pac paportal upload -p "${localPath}" --deploymentProfile "${deploymentProfile}"`
            : `pac paportal upload -p "${localPath}"`;
        return command;
    }

    public static AuthList() {
        return 'pac auth list';
    }

    public static AuthCreateProfile(dataverseUrl: string) {
        return `pac auth create -u ${dataverseUrl}`;
    }

    public static AuthDeleteProfile(index: string) {
        return `pac auth delete -i ${index}`;
    }

    public static AuthSwitchProfile(index: string) {
        return `pac auth select -i ${index}`;
    }
}