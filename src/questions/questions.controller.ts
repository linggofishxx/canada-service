// src/questions/questions.controller.ts
import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './question.entity';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Get()
  findAll(): Promise<Question[]> {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Question | null> {
    return this.questionsService.findOne(id);
  }

  @Get('unit/:unitId')
  async getByUnit(@Param('unitId') unitId: string) {
    return this.questionsService.findByUnit(Number(unitId));
  }

  @Post()
  create(@Body() data: Partial<Question>): Promise<Question> {
    return this.questionsService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.questionsService.remove(id);
  }
}
