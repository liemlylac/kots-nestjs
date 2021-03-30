import { EntityRepository, Repository } from 'typeorm';
import { ActionEntity } from '../entities';

@EntityRepository(ActionEntity)
export class ActionRepository extends Repository<ActionEntity> {}
