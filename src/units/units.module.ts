import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './unit.entity';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { Question } from '../questions/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unit, Question])],

  controllers: [UnitsController],
  providers: [UnitsService],
})
export class UnitsModule { }
