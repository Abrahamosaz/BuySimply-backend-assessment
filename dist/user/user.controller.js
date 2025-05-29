"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const role_decorator_1 = require("../common/decorators/role.decorator");
const user_entity_1 = require("../database/entities/user.entity");
const createUser_dto_1 = require("./dtos/createUser.dto");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUsers() {
        return this.userService.getUsers();
    }
    async getUser(id) {
        return this.userService.getUser(id);
    }
    async createUser(createUserDto) {
        return this.userService.createUser(createUserDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Fetch all the users' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Users fetched successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Users fetched successfully' },
                statusCode: { type: 'number', example: 200 },
            },
        },
    }),
    (0, swagger_1.ApiSecurity)('x-api-key'),
    (0, swagger_1.ApiCookieAuth)('access_token'),
    (0, role_decorator_1.Roles)([user_entity_1.UserRole.ADMIN]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiSecurity)('x-api-key'),
    (0, swagger_1.ApiCookieAuth)('access_token'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)([user_entity_1.UserRole.ADMIN]),
    (0, swagger_1.ApiSecurity)('x-api-key'),
    (0, swagger_1.ApiCookieAuth)('access_token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map