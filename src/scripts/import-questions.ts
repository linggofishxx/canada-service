// src/scripts/import-questions.ts
import { DataSource } from 'typeorm';
import { Unit } from '../units/unit.entity';
import { Question } from '../questions/question.entity';
import * as fs from 'fs';
import * as path from 'path';
import slugify from 'slugify';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'quiz.db',
  entities: [Unit, Question],
  synchronize: true,
});

// ✅ 把重音、空格、特殊字符都变成安全的 slug
function safeName(name: string): string {
  const parts = name.split('.');
  const fileExtension = parts.length > 1 ? parts.pop() : ''; // 提取扩展名
  const baseName = parts.join('.'); // 文件名

  return slugify(baseName.normalize('NFC'), {
    replacement: '_',
    lower: true,
    strict: true,
  }) + (fileExtension ? '.' + fileExtension : ''); // 添加扩展名
}

async function importQuestions() {
  await AppDataSource.initialize();

  const unitRepo = AppDataSource.getRepository(Unit);
  const questionRepo = AppDataSource.getRepository(Question);

  // 清空数据库
  await questionRepo.clear();
  await unitRepo.clear();

  const publicDir = path.join(__dirname, '../../public');
  const tests = fs.readdirSync(publicDir);

  for (const test of tests) {
    const unitType = test === 'compréhension écrite tests' ? 'read' : 'listen';
    const unitsDir = path.join(publicDir, test);
    if (!fs.statSync(unitsDir).isDirectory()) continue;

    const units = fs.readdirSync(unitsDir);
    for (const unit of units) {
      const unitPath = path.join(unitsDir, unit);
      if (!fs.statSync(unitPath).isDirectory()) continue;

      // ✅ 用安全名字保存
      const safeUnit = safeName(unit);

      let unitEntity = await unitRepo.findOne({ where: { name: safeUnit } });
      if (!unitEntity) {
        unitEntity = unitRepo.create({ name: safeUnit, unitType });
        await unitRepo.save(unitEntity);
      }

      const questionFolders = fs.readdirSync(unitPath);
      const jsonFile = path.join(unitPath, 'questions.json');
      if (!fs.existsSync(jsonFile)) continue;

      const raw = fs.readFileSync(jsonFile, 'utf-8');
      const data = JSON.parse(raw);

      for (const [index, qFolder] of questionFolders.entries()) {
        const qPath = path.join(unitPath, qFolder);
        if (!fs.statSync(qPath).isDirectory()) continue;

        // ✅ 用安全名字
        const safeQFolder = safeName(qFolder);

        const files = fs.readdirSync(qPath);
        const imageFile = files.find(f => /\.(png|jpg|jpeg)$/i.test(f));
        const audioFile = files.find(f => /\.(mp3|wav)$/i.test(f));

        // ✅ 文件名也安全化
        const safeImageFile = imageFile ? safeName(imageFile) : '';
        const safeAudioFile = audioFile ? safeName(audioFile) : '';

        // ✅ 重命名文件
        if (imageFile && safeImageFile !== imageFile) {
          fs.renameSync(path.join(qPath, imageFile), path.join(safeQFolder, safeImageFile));
        }
        if (audioFile && safeAudioFile !== audioFile) {
          fs.renameSync(path.join(qPath, audioFile), path.join(safeQFolder, safeAudioFile));
        }

        const imagePath = safeImageFile ? `/static/${test}/${safeUnit}/${safeQFolder}/${safeImageFile}` : '';
        const mp3Path = safeAudioFile ? `/static/${test}/${safeUnit}/${safeQFolder}/${safeAudioFile}` : '';

        const q = data[index];
        const entity = questionRepo.create({
          title: q.title || safeQFolder,
          image_desc: q.image_desc || '',
          image_url: imagePath || '',
          mp3_url: mp3Path || '',
          answer_items: JSON.stringify(q.answer_items),
          unit: unitEntity,
        });

        await questionRepo.save(entity);
      }

      fs.renameSync(unitPath, path.join(unitsDir, safeUnit));
    }
  }

  await AppDataSource.destroy();
}

importQuestions().catch(err => {
  console.error(err);
  process.exit(1);
});
