import { A_OS_Page } from "../entities/page/A_OS_Page.class";
import { A_OS_Widget } from "../entities/widget/A_OS_Widget.class";
/**
 * A migration manager for A_OS Components
 *
 * This class allows to build automatic migration of A_OS_Widgets and A_OS_Pages to the server
 * It can be used during the development process or for the deployment of the application
 */
export declare class A_OS_MigrationManager {
    private migrationSet;
    constructor(migrationSet?: Array<A_OS_Widget | A_OS_Page>);
    /**
     * Migrate A_OS_Widgets and A_OS_Pages to the server
     * This method will automatically compile the data and send it to the server
     * Then Pages and Widgets will be available in the A-OS application relating to APP
     *
     * [!] Ensure that provided Environment Credentials are correct and corresponding to the target APP
     * otherwise widgets may be attached to another application
     */
    migrate(): Promise<void>;
}
