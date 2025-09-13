// 答案选项
export interface AnswerItem {
  label: string; // 显示文字，例如 "A Il dort"
  value: number; // 对应值，例如 1
}

// 单个试题
export interface QuestionItem {
  id?: number;
  title: string;              // 题干（可以是空字符串）
  image_desc: string;         // 图片描述（可以是空字符串）
  image_url: string;          // 图片 URL，例如 "/static/images/q1.png"
  mp3_url: string;            // 音频 URL，例如 "/static/audio/q1.mp3"
  answer_items: AnswerItem[]; // 答案选项数组
}

export type UnitType = 'read' | 'listen'
