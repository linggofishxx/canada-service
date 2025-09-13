import { DataSource } from 'typeorm';
import { Unit } from '../units/unit.entity';
import { Question } from '../questions/question.entity';

async function checkData() {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: 'quiz.db',
    entities: [Unit, Question],
    synchronize: true,
  });

  await dataSource.initialize();

  const unitRepo = dataSource.getRepository(Unit);
  const questionRepo = dataSource.getRepository(Question);

  const units = await unitRepo.find({ relations: ['questions'] });
  console.log('Units:', units);

  const questions = await questionRepo.find({ relations: ['unit'] });
  console.log('Questions:', questions);

  await dataSource.destroy();
}

checkData();
