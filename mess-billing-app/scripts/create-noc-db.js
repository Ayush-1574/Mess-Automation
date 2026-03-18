const { Client } = require('pg');

async function createDB() {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'vishw@n1811',
        database: 'postgres'  // Connect to default DB first
    });
    
    try {
        await client.connect();
        // Check if database exists
        const res = await client.query(
            "SELECT 1 FROM pg_database WHERE datname = 'noc_system'"
        );
        if (res.rows.length === 0) {
            await client.query('CREATE DATABASE noc_system');
            console.log('Database noc_system created successfully');
        } else {
            console.log('Database noc_system already exists');
        }
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await client.end();
    }
}

createDB();
