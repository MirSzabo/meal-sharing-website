const getSQLQuery = whereQuery => {
  // Create a temporary table of random name to get the number of available reservations
  const tempTableName = `temp_${Math.floor(
    Math.random() * Math.floor(100000)
  )}`;
  return `
    CREATE TABLE ${tempTableName} AS
    SELECT 
      meal.id, 
      meal.max_reservations, 
      SUM(IFNULL(reservation.number_of_guests, 0)) AS reservations
    FROM meal
    LEFT OUTER JOIN reservation 
    ON meal.id = reservation.meal_id
    GROUP BY meal.id;
    SELECT 
      meal.id, 
      meal.title,
      meal.description,
      meal.location,
      meal.when,
      meal.max_reservations,
      meal.price,
      meal.created_date,
      (${tempTableName}.max_reservations - ${tempTableName}.reservations) AS available_reservations
    FROM meal
    INNER JOIN ${tempTableName}
    ON meal.id = ${tempTableName}.id${whereQuery};
    DROP TABLE \`${tempTableName}\`;
    `;
};

module.exports = {
  getSQLQuery: getSQLQuery
};
