import { Model } from "sequelize";
import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Unique } from 'sequelize-typescript';

export type AirQualityAttributes = {
    id: number,
    city: string,
    ts: string,
    aqius: number,
    mainus: string,
    aqicn: number,
    maincn: string
}

export default class AirQuality
  extends Model<AirQualityAttributes>
  implements AirQualityAttributes
{
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  city!: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  ts!: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  aqius!: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  mainus!: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  aqicn!: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  maincn!: string;
}