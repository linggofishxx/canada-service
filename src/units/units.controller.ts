import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UnitsService } from './units.service';

@Controller('units')
export class UnitsController {
  constructor(private readonly service: UnitsService) { }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const unit = this.service.findOne(id);
    // 解析 answer_items 为数组
    return unit.then(u => u ? ({
      ...u,
      questions: u.questions.map(q => ({
        ...q,
        answer_items: JSON.parse(q.answer_items),
      })),
    }) : {});
  }
  // GET /units/type/read
  @Get('type/:type')
  async getUnitsByType(@Param('type') type: string) {
    return this.service.findUnitsByType(type);
  }
}
