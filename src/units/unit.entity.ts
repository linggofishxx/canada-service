import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from '../questions/question.entity';
import { type UnitType } from '../common/types'

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  unitType: UnitType;

  // 一个 Unit 有多个 Question
  @OneToMany(() => Question, (question) => question.unit, { cascade: true })
  questions: Question[];
}
