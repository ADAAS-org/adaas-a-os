import { A_OS_Context } from "@adaas/a-sdk/global/A_OS_Context.class";
import { A_OS_Page } from "../entities/page/A_OS_Page.class";
import { A_OS_Widget } from "../entities/widget/A_OS_Widget.class";
import { A_PRODUCTS_ServerCommands } from "@adaas/a-products";
import { A_SDK_ServerError } from "@adaas/a-sdk-types";


/**
 * A migration manager for A_OS Components
 * 
 * This class allows to build automatic migration of A_OS_Widgets and A_OS_Pages to the server
 * It can be used during the development process or for the deployment of the application
 */
export class A_OS_MigrationManager {

    private migrationSet: Array<A_OS_Widget | A_OS_Page>;

    constructor(
        migrationSet: Array<A_OS_Widget | A_OS_Page> = []
    ) {
        this.migrationSet = migrationSet;
    }



    /**
     * Migrate A_OS_Widgets and A_OS_Pages to the server
     * This method will automatically compile the data and send it to the server
     * Then Pages and Widgets will be available in the A-OS application relating to APP
     * 
     * [!] Ensure that provided Environment Credentials are correct and corresponding to the target APP
     * otherwise widgets may be attached to another application
     */
    async migrate() {
        try {
            await A_OS_Context.ready;

            A_OS_Context.Logger.log('Migrating A_OS_Widgets and A_OS_Pages...');

            const pages = this.migrationSet.filter(item => item instanceof A_OS_Page) as Array<A_OS_Page>;
            const widgets = this.migrationSet.filter(item => item instanceof A_OS_Widget) as Array<A_OS_Widget>;


            A_OS_Context.Logger.log('Compiling A_OS_Widgets and A_OS_Pages data');
            await Promise.all([
                ...pages.map(page => page.compile()),
                ...widgets.map(widget => widget.compile())
            ]);


            A_OS_Context.Logger.log('Migrating A_OS_Widgets and A_OS_Pages data to the server');

            await Promise.all([
                A_PRODUCTS_ServerCommands.Page.migrate({
                    pages: pages.map(page => page.toJSON())
                }),
                A_PRODUCTS_ServerCommands.Widget.migrate({
                    widgets: widgets.map(widget => widget.toJSON())
                })
            ]);

            A_OS_Context.Logger.log(
                'Migration completed',
                `- Total pages: ${pages.length}`,
                `- Total widgets: ${widgets.length}`
            );

        } catch (error) {
            A_OS_Context.Logger.error('Migration failed', new A_SDK_ServerError(error));
        }
    }
}