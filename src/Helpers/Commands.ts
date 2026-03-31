export class Commands {
    public static PortalList() {
        return 'pac pages list';
    }

    public static DownloadPortal(localPath: string, websiteId: string, overwritePortal: string | undefined, 
        includedEntities?: string, excludedEntities?: string, modelVersion?: string) {
        const overwriteText = overwritePortal === 'Yes' ? `-o true` : '';
        const includeEntities = includedEntities ? `-ie "${includedEntities}"`: '';
        const excludeEntities = excludedEntities ? `-xe "${excludedEntities}"`: '';
        const mVersion = modelVersion ? `-mv "${modelVersion}"`: '';
        return `pac pages download -p "${localPath}" -id ${websiteId} ${overwriteText} ${includeEntities} ${excludeEntities} ${mVersion}`;
    }

    public static UploadPortal(localPath: string, deploymentProfile: string | undefined) {
        const command = deploymentProfile
            ? `pac pages upload -p "${localPath}" --deploymentProfile "${deploymentProfile}"`
            : `pac pages upload -p "${localPath}"`;
        return command;
    }

    public static BootstrapMigrate(localPath: string){
        return `pac pages bootstrap-migrate -p "${localPath}"`;
    }

    public static DownloadCodeSite(localPath: string, websiteId: string, overwrite?: boolean) {
        const overwriteText = overwrite ? `-o` : '';
        return `pac pages download-code-site -p "${localPath}" -id ${websiteId} ${overwriteText}`.trim();
    }

    public static UploadCodeSite(rootPath: string, compiledPath?: string, siteName?: string) {
        const compiled = compiledPath ? `-cp "${compiledPath}"` : '';
        const name = siteName ? `-sn "${siteName}"` : '';
        return `pac pages upload-code-site -rp "${rootPath}" ${compiled} ${name}`.trim().replace(/\s+/g, ' ');
    }

    public static MigrateDatamodel(websiteId: string, checkStatus?: boolean, mode?: string,
        updateVersion?: boolean, reset?: boolean, revert?: boolean) {
        const check = checkStatus ? `-s` : '';
        const modeText = mode ? `-m "${mode}"` : '';
        const update = updateVersion ? `-u` : '';
        const resetText = reset ? `-rs` : '';
        const revertText = revert ? `-r` : '';
        return `pac pages migrate-datamodel -id ${websiteId} ${check} ${modeText} ${update} ${resetText} ${revertText}`
            .trim().replace(/\s+/g, ' ');
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