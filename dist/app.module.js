"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const json_headers_middleware_1 = require("./middleware/json.headers.middleware");
const req_log_middleware_1 = require("./middleware/req.log.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(json_headers_middleware_1.JsonHeadersMiddleware, req_log_middleware_1.ReqLogMiddleware)
            .forRoutes({
            path: '*', method: common_1.RequestMethod.ALL
        });
    }
    ;
};
AppModule = __decorate([
    common_1.Module({
        imports: [],
        controllers: [app_controller_1.MainPageController, app_controller_1.UsersController, app_controller_1.BoardsController, app_controller_1.TasksController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
;
//# sourceMappingURL=app.module.js.map