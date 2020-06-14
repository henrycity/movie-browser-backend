INSERT INTO users(email, password, lists)
VALUES ($1,$2,$3)
RETURNING *
