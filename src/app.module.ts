import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { QuestionsModule } from './questions/questions.module';
import { UnitsModule } from './units/units.module';
import { Question } from './questions/question.entity';
import { Unit } from './units/unit.entity';

@Module({
  imports: [
    // 配置数据库 (SQLite)
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'quiz.db',
      entities: [Unit, Question],
      synchronize: true, // 开发环境下自动建表，生产请关闭
    }),

    // 静态资源：/public 对应 URL 前缀 /static
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static',
    }),
    UnitsModule,
    QuestionsModule,
  ],
})
export class AppModule { }
