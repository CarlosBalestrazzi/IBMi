// import required class - DBPool from idb-pconnector for connection to DB2
const { DBPool } = require('idb-pconnector');

// Keep the SQL statement ready
const sql = `CREATE OR REPLACE TABLE RU543361.ARBITRAJES(
                Date Timestamp(0),
                BCURR CHAR(3),
                USD Decimal(12, 4),
                EUR Decimal(12, 4),
                GBP Decimal(12, 4),
                INR Decimal(12, 4),
                UYU Decimal(12, 4)) RCDFMT RARBITRAJE`;

const label = `LABEL ON COLUMN RU543361.ARBITRAJES (
                Date TEXT IS 'Fecha arbitraje',
                BCURR TEXT IS 'Moneda Base',
                USD  TEXT IS 'Dolar USA',
                EUR  TEXT IS 'Euro',
                GBP  TEXT IS 'Libra Esterlina',
                INR  TEXT IS 'Rupia',
                UYU  TEXT IS 'Pesos Uruguayos')`;

const colhdg = `LABEL ON COLUMN RU543361.ARBITRAJES (
                Date  IS 'Fecha arbitraje',
                BCURR IS 'Moneda Base',
                USD   IS 'Dolar USA',
                EUR  IS 'Euro',
                GBP  IS 'Libra Esterlina',
                INR  IS 'Rupia',
                UYU  IS 'Pesos Uruguayos')`;
// Write async - promised based function so that await can be used
async function createDB() {

    try {
        const pool = new DBPool(); //Create a new instance of pool
        const connection = pool.attach(); // create the connection
        const statement = connection.getStatement(); //create new instance of statement
        // execute and await each statement, if something goes wrong, we will be in error block. 
        await statement.prepare(sql);
        await statement.execute();
        await statement.prepare(label);
        await statement.execute();
        await statement.prepare(colhdg);
        await statement.execute();

        await pool.detach(connection); //Once done, detach/close the connection 
    } catch (error) {
        console.log(error);
    }
}

//call the function and catch errors, if any.
createDB().catch((error) => {
    console.error(error);
})