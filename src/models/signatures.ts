import {
    Model,
    DataTypes,
    Sequelize
} from 'sequelize';

export type SignatureModel = {
    hash: string;
    function: string;
}

const Sign = (sequelize: Sequelize, Sequelize: typeof DataTypes) => {
    class Signatures extends Model<SignatureModel> {
        // static associate({}) {}
    };
    Signatures.init({
        hash: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        function: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false,
        sequelize,
        modelName: 'Signatures',
        tableName: 'signatures'
    });
    return Signatures;
}

export default Sign;