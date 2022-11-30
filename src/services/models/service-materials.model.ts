import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Material } from 'src/materials/models/materials.model';
import { Service } from './services.model';

@Table({ tableName: 'service-materials', createdAt: false, updatedAt: false })
export class ServiceMaterials extends Model {
  @ForeignKey(() => Service)
  @Column({ type: DataType.INTEGER })
  serviceId: number;

  @ForeignKey(() => Material)
  @Column({ type: DataType.INTEGER })
  materialId: number;
}
