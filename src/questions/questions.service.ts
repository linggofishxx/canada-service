import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { Unit } from '../units/unit.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    @InjectRepository(Unit)
    private readonly unitRepo: Repository<Unit>,
  ) { }

  /** 获取所有题目，包含所属单元 */
  findAll(): Promise<Question[]> {
    return this.questionRepo.find({ relations: ['unit'] });
  }

  /** 根据题目 ID 获取单题详情 */
  findOne(id: number): Promise<Question | null> {
    return this.questionRepo.findOne({ where: { id }, relations: ['unit'] });
  }

  /** 获取某个单元下的所有题目 */
  async findByUnit(unitId: number): Promise<Question[]> {
    const unit = await this.unitRepo.findOne({ where: { id: unitId }, relations: ['questions'] });
    if (!unit) return [];
    return unit.questions.sort((a: any, b: any) => {
      const aNum = Number(a.replace(/\D/g, ''));
      const bNum = Number(b.replace(/\D/g, ''));
      return aNum - bNum;
    });
  }

  /** 创建题目并关联单元 */
  async create(data: Partial<Question>): Promise<Question> {
    const question = this.questionRepo.create({ ...data });
    return this.questionRepo.save(question);
  }

  /** 删除题目 */
  async remove(id: number): Promise<void> {
    await this.questionRepo.delete(id);
  }
}
