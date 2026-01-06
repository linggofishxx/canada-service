// src/units/units.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from './unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private readonly repo: Repository<Unit>,
  ) { }

  findAll() {
    return this.repo.find({ relations: ['questions'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['questions'] });
  }

  create(data: Partial<Unit>): Promise<Unit> {
    const unit = this.repo.create(data);
    return this.repo.save(unit);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  // 根据类型获取单元名
  async findUnitsByType(type: string): Promise<Unit[]> {
    const units: any[] = await this.repo.find({
      where: { unitType: type } as any,   // 避免 TS 报错
      select: ['id', 'name', 'unitType'], // 只要基本信息
    });
    return units.sort((a: any, b: any) => {
      const reg = /test_(\d+)_serie/;
      const aMatch = a.match(reg);
      const bMatch = b.match(reg);
      return (aMatch?.[1] ?? 0) - (bMatch?.[1] ?? 0);
    })
  }
}
