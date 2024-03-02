import {
    DataTypes,
    FindAttributeOptions,
    Model,
    WhereOptions,
} from "sequelize";

import { sequelize } from "../connection";

export type AirQualityAttributes = {
    id?: number;
    city?: string;
    ts?: string;
    aqius?: number;
    mainus?: string;
    aqicn?: number;
    maincn?: string;
};

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

export const createAirQualityRecord = async (
    data: AirQualityAttributes,
): Promise<AirQuality> => {
    try {
        const record = AirQuality.build({
            city: data?.city,
            ts: data?.ts,
            aqius: data?.aqius,
            mainus: data?.mainus,
            aqicn: data?.aqicn,
            maincn: data?.maincn,
        });

        await record.save();
        return record.get({ plain: true });
    } catch (error) {
        throw new Error("Could not create new AirQuality record");
    }
};

export const fetchAirQualityRecord = async (
    attributes: FindAttributeOptions,
    condition: WhereOptions,
): Promise<AirQuality | null> => {
    try {
        const record = await AirQuality.findOne({
            attributes,
            where: condition,
            raw: true,
        });

        return record ?? null;
    } catch (error) {
        throw new Error("Could not create new AirQuality record");
    }
};

export default AirQuality;
