"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInstructionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_instruction_dto_1 = require("./create-instruction.dto");
class UpdateInstructionDto extends (0, mapped_types_1.PartialType)(create_instruction_dto_1.CreateInstructionDto) {
}
exports.UpdateInstructionDto = UpdateInstructionDto;
//# sourceMappingURL=update-instruction.dto.js.map