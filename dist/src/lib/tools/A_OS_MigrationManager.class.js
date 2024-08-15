"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_OS_MigrationManager = void 0;
const A_OS_Context_class_1 = require("../../global/A_OS_Context.class");
const A_OS_Page_class_1 = require("../entities/page/A_OS_Page.class");
const A_OS_Widget_class_1 = require("../entities/widget/A_OS_Widget.class");
const a_products_1 = require("@adaas/a-products");
const a_sdk_types_1 = require("@adaas/a-sdk-types");
/**
 * A migration manager for A_OS Components
 *
 * This class allows to build automatic migration of A_OS_Widgets and A_OS_Pages to the server
 * It can be used during the development process or for the deployment of the application
 */
class A_OS_MigrationManager {
    constructor(migrationSet = []) {
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
    migrate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield A_OS_Context_class_1.A_OS_Context.ready;
                A_OS_Context_class_1.A_OS_Context.Logger.log('Migrating A_OS_Widgets and A_OS_Pages...');
                const pages = this.migrationSet.filter(item => item instanceof A_OS_Page_class_1.A_OS_Page);
                const widgets = this.migrationSet.filter(item => item instanceof A_OS_Widget_class_1.A_OS_Widget);
                A_OS_Context_class_1.A_OS_Context.Logger.log('Compiling A_OS_Widgets and A_OS_Pages data');
                yield Promise.all([
                    ...pages.map(page => page.compile()),
                    ...widgets.map(widget => widget.compile())
                ]);
                A_OS_Context_class_1.A_OS_Context.Logger.log('Migrating A_OS_Widgets and A_OS_Pages data to the server');
                yield Promise.all([
                    a_products_1.A_PRODUCTS_ServerCommands.Page.migrate({
                        pages: pages.map(page => page.toJSON())
                    }),
                    a_products_1.A_PRODUCTS_ServerCommands.Widget.migrate({
                        widgets: widgets.map(widget => widget.toJSON())
                    })
                ]);
                A_OS_Context_class_1.A_OS_Context.Logger.log('Migration completed', `- Total pages: ${pages.length}`, `- Total widgets: ${widgets.length}`);
            }
            catch (error) {
                A_OS_Context_class_1.A_OS_Context.Logger.error('Migration failed', new a_sdk_types_1.A_SDK_ServerError(error));
            }
        });
    }
}
exports.A_OS_MigrationManager = A_OS_MigrationManager;
//# sourceMappingURL=A_OS_MigrationManager.class.js.map