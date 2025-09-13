// src/questions/questions.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Question } from './question.entity';
import { Unit } from '../units/unit.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Question, Unit])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule { }
