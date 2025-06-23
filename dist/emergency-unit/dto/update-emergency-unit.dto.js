"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmergencyUnitDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_emergency_unit_dto_1 = require("./create-emergency-unit.dto");
class UpdateEmergencyUnitDto extends (0, mapped_types_1.PartialType)(create_emergency_unit_dto_1.CreateEmergencyUnitDto) {
}
exports.UpdateEmergencyUnitDto = UpdateEmergencyUnitDto;
//# sourceMappingURL=update-emergency-unit.dto.js.map