module.exports = (sequelize, Sequelize) => {
    const Quote = sequelize.define("quote", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quote: {
            type: Sequelize.STRING,
            allowNull: false
        },
        favorite: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return Quote;
  };