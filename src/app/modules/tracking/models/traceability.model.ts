import { EvaluationAnswer } from './evaluationAnswer.model';
import { History } from './history.model';

export class Traceability {
  constructor(
    public history: Array<History>,
    public evaluationAnswer: Array<EvaluationAnswer>
  ) {}
}
