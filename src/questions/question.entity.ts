import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Unit } from '../units/unit.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: '' })
  image_desc: string;

  @Column({ default: '' })
  image_url: string;

  @Column({ default: '' })
  mp3_url: string;

  @Column('text')
  answer_items: string; // 存 JSON 字符串

  // 多个 Question 属于一个 Unit
  @ManyToOne(() => Unit, (unit) => unit.questions, { onDelete: 'CASCADE' })
  unit: Unit;
}
