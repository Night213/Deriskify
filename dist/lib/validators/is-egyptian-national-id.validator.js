"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEgyptianNationalIdConstraint = void 0;
exports.IsEgyptianNationalId = IsEgyptianNationalId;
const class_validator_1 = require("class-validator");
const egyptian_nationalid_1 = require("egyptian-nationalid");
let IsEgyptianNationalIdConstraint = class IsEgyptianNationalIdConstraint {
    validate(id) {
        if (id.length !== 14)
            return false;
        return (0, egyptian_nationalid_1.isValid)(id);
    }
    defaultMessage(args) {
        return `${args.property} must be a valid Egyptian National ID`;
    }
};
exports.IsEgyptianNationalIdConstraint = IsEgyptianNationalIdConstraint;
exports.IsEgyptianNationalIdConstraint = IsEgyptianNationalIdConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsEgyptianNationalId', async: false })
], IsEgyptianNationalIdConstraint);
function IsEgyptianNationalId(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: IsEgyptianNationalIdConstraint,
        });
    };
}
//# sourceMappingURL=is-egyptian-national-id.validator.js.map