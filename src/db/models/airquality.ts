import { DataTypes, Model } from "sequelize";

import { sequelize } from "../connection";

class AirQuality extends Model {
    declare id: number;
    declare city: string;
    declare ts: string;
    declare aqius: number;
    declare mainus: string;
    declare aqicn: number;
    declare maincn: string;
}

AirQuality.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ts: DataTypes.DATE,
        aqius: DataTypes.INTEGER,
        mainus: DataTypes.STRING,
        aqicn: DataTypes.INTEGER,
        maincn: DataTypes.STRING,
    },
    { sequelize, modelName: "air_qualities" },
);

export default AirQuality;
