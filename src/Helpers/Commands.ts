export class Commands {
    public static PortalList(){
        return 'pac paportal list';
    }

    public static DownloadPortal(localPath:string, websiteId: string, overwritePortal: string | undefined){
        let overwriteText = overwritePortal === "Yes" ? `-o true`: '';
        return `pac paportal download -p ${localPath} -id ${websiteId} ${overwriteText}`;
    }

    public static UploadPortal(localPath:string){
        return `pac paportal upload -p ${localPath}`;
    }

    public static AuthList(){
        return 'pac auth list';
    }

    public static AuthCreateProfile(dataverseUrl:string){
        return `pac auth create -u ${dataverseUrl}`;
    }

    public static AuthDeleteProfile(index: string) {
        return `pac auth delete -i ${index}`;
    }

    public static AuthSwitchProfile(index: string) {
        return `pac auth select -i ${index}`;
    }
}