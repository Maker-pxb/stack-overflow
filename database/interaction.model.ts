import { Schema, models, model, Document } from 'mongoose'

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId
  action: string
  question: Schema.Types.ObjectId
  answer: Schema.Types.ObjectId
  tags: Schema.Types.ObjectId[]
  createdAt: Date
}

export enum ReputationAction {
  ASK_QUESTION = 'ask_question',
  ANSWER = 'answer',
  VIEW = 'view'
}

export enum ActionScore {
  ASK_QUESTION = 5,
  UPVOTE_QUESTION_FOR_USER = 1,
  DOWNVOTE_QUESTION_FOR_USER = -1,
  UPVOTE_QUESTION_FOR_AUTHOR = 10,
  DOWNVOTE_QUESTION_FOR_AUTHOR = -10,
  ANSWER = 10,
  UPVOTE_ANSWER_FOR_USER = 1,
  DOWNVOTE_ANSWER_FOR_USER = -1,
  UPVOTE_ANSWER_FOR_AUTHOR = 10,
  DOWNVOTE_ANSWER_FOR_AUTHOR = -10
}

const InteractionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question' },
  answer: { type: Schema.Types.ObjectId, ref: 'Answer' },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  createdAt: { type: Date, default: Date.now }
})

const Interaction =
  models.Interaction || model<IInteraction>('Interaction', InteractionSchema)

export default Interaction
